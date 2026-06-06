package com.kmanager.service;

import com.kmanager.dto.*;
import com.kmanager.entity.*;
import com.kmanager.repository.*;
import com.kmanager.websocket.WebSocketController;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class SessionService {

    private final SessionRepository sessionRepository;
    private final BillItemRepository billItemRepository;
    private final BillRepository billRepository;
    private final RoomRepository roomRepository;
    private final MenuItemRepository menuItemRepository;
    private final VenueRepository venueRepository;
    private final WebSocketController wsController;

    public SessionService(SessionRepository sessionRepository, BillItemRepository billItemRepository,
                          BillRepository billRepository, RoomRepository roomRepository,
                          MenuItemRepository menuItemRepository, VenueRepository venueRepository,
                          WebSocketController wsController) {
        this.sessionRepository = sessionRepository;
        this.billItemRepository = billItemRepository;
        this.billRepository = billRepository;
        this.roomRepository = roomRepository;
        this.menuItemRepository = menuItemRepository;
        this.venueRepository = venueRepository;
        this.wsController = wsController;
    }

    @Transactional
    public SessionResponse createSession(UUID venueId, UUID roomId, CreateSessionRequest request, String username) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        if (room.getStatus() != Room.RoomStatus.AVAILABLE) {
            throw new RuntimeException("Room is not available");
        }

        long rate = request.getHourlyRate() != null ? request.getHourlyRate() : room.getHourlyRate();

        Session session = new Session();
        session.setVenue(room.getVenue());
        session.setRoom(room);
        session.setCustomerName(request.getCustomerName());
        session.setCustomerPhone(request.getCustomerPhone());
        session.setHourlyRate(rate);
        session.setNotes(request.getNotes());
        session.setStatus(Session.SessionStatus.ACTIVE);
        session.setStartedAt(LocalDateTime.now());
        session.setCreatedBy(username);

        session = sessionRepository.save(session);

        room.setStatus(Room.RoomStatus.OCCUPIED);
        roomRepository.save(room);

        notifyVenue(venueId.toString());
        return toSessionResponse(session);
    }

    @Transactional
    public SessionResponse removeItem(UUID venueId, UUID sessionId, UUID itemId) {
        Session session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Session not found"));

        if (session.getStatus() != Session.SessionStatus.ACTIVE) {
            throw new RuntimeException("Session is not active");
        }

        billItemRepository.deleteById(itemId);
        session.getBillItems().removeIf(i -> i.getId().equals(itemId));

        notifyVenue(venueId.toString());
        return toSessionResponse(session);
    }

    @Transactional
    public SessionResponse addItem(UUID venueId, UUID sessionId, AddItemRequest request) {
        Session session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Session not found"));

        if (session.getStatus() != Session.SessionStatus.ACTIVE) {
            throw new RuntimeException("Session is not active");
        }

        MenuItem menuItem = menuItemRepository.findById(request.getMenuItemId())
                .orElseThrow(() -> new RuntimeException("Menu item not found"));

        Optional<BillItem> existing = session.getBillItems().stream()
                .filter(i -> i.getMenuItemId().equals(menuItem.getId()))
                .findFirst();

        if (existing.isPresent()) {
            BillItem item = existing.get();
            item.setQuantity(item.getQuantity() + request.getQuantity());
            billItemRepository.save(item);
        } else {
            BillItem item = new BillItem();
            item.setSession(session);
            item.setMenuItemId(menuItem.getId());
            item.setItemNameEn(menuItem.getNameEn());
            item.setItemNameVi(menuItem.getNameVi());
            item.setQuantity(request.getQuantity());
            item.setUnitPrice(menuItem.getPrice());
            billItemRepository.save(item);
            session.getBillItems().add(item);
        }

        notifyVenue(venueId.toString());
        return toSessionResponse(session);
    }

    @Transactional
    public BillResponse closeBill(UUID venueId, UUID sessionId, CloseBillRequest request, String username) {
        Session session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Session not found"));

        if (session.getStatus() != Session.SessionStatus.ACTIVE) {
            throw new RuntimeException("Session is already closed");
        }

        Venue venue = venueRepository.findById(venueId).orElse(null);

        LocalDateTime startAt = request.getStartedAt() != null
                ? LocalDateTime.parse(request.getStartedAt()) : session.getStartedAt();
        LocalDateTime endAt = request.getEndedAt() != null
                ? LocalDateTime.parse(request.getEndedAt()) : LocalDateTime.now();
        long rate = request.getHourlyRate() != null ? request.getHourlyRate() : session.getHourlyRate();

        session.setStartedAt(startAt);
        session.setEndedAt(endAt);
        session.setHourlyRate(rate);
        session.setStatus(Session.SessionStatus.CLOSED);
        sessionRepository.save(session);

        long durationSeconds = java.time.Duration.between(startAt, endAt).getSeconds();
        long roomCharge = (long) Math.ceil(durationSeconds / 3600.0 * rate);
        long itemSubtotal = session.getBillItems().stream()
                .mapToLong(i -> i.getQuantity() * i.getUnitPrice()).sum();
        long discount = request.getDiscount() != null ? request.getDiscount() : 0L;
        long grandTotal = roomCharge + itemSubtotal - discount;

        String billNumber = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd")) + "-" +
                String.format("%04d", billRepository.countByVenueIdAndCreatedAtBetween(venueId,
                        LocalDateTime.now().toLocalDate().atStartOfDay(),
                        LocalDateTime.now().toLocalDate().plusDays(1).atStartOfDay()) + 1);

        Bill bill = new Bill();
        bill.setSession(session);
        bill.setBillNumber(billNumber);
        bill.setVenueId(venueId);
        bill.setRoomNumber(session.getRoom() != null ? session.getRoom().getRoomNumber() : "N/A");
        bill.setCustomerName(session.getCustomerName());
        bill.setCustomerPhone(session.getCustomerPhone());
        bill.setStartedAt(startAt);
        bill.setEndedAt(endAt);
        bill.setDurationSeconds(durationSeconds);
        bill.setHourlyRate(rate);
        bill.setRoomCharge(roomCharge);
        bill.setItemSubtotal(itemSubtotal);
        bill.setDiscount(discount);
        bill.setGrandTotal(grandTotal);
        bill.setPaymentMethod(Bill.PaymentMethod.valueOf(request.getPaymentMethod().toUpperCase()));
        bill.setAmountTendered(request.getAmountTendered());
        bill.setChangeDue(request.getAmountTendered() != null ? request.getAmountTendered() - grandTotal : null);
        bill.setCreatedBy(username);

        bill = billRepository.save(bill);

        Room room = session.getRoom();
        if (room != null) {
            room.setStatus(Room.RoomStatus.AVAILABLE);
            roomRepository.save(room);
        }

        notifyVenue(venueId.toString());
        return toBillResponse(bill, venue);
    }

    public SessionResponse getSession(UUID sessionId) {
        return toSessionResponse(sessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Session not found")));
    }

    public List<SessionResponse> getActiveSessions(UUID venueId) {
        return sessionRepository.findByVenueIdAndStatus(venueId, Session.SessionStatus.ACTIVE)
                .stream().map(this::toSessionResponse).collect(Collectors.toList());
    }

    public SessionResponse getActiveSessionByRoom(UUID roomId) {
        List<Session> sessions = sessionRepository.findByRoomIdAndStatus(roomId, Session.SessionStatus.ACTIVE);
        if (sessions.isEmpty()) throw new RuntimeException("No active session for this room");
        return toSessionResponse(sessions.get(0));
    }

    private SessionResponse toSessionResponse(Session s) {
        long elapsed = s.getStatus() == Session.SessionStatus.ACTIVE
                ? java.time.Duration.between(s.getStartedAt(), LocalDateTime.now()).getSeconds()
                : java.time.Duration.between(s.getStartedAt(), s.getEndedAt()).getSeconds();
        long roomCharge = (long) Math.ceil(elapsed / 3600.0 * s.getHourlyRate());
        long itemSubtotal = s.getBillItems().stream().mapToLong(i -> i.getQuantity() * i.getUnitPrice()).sum();

        SessionResponse resp = new SessionResponse();
        resp.setId(s.getId());
        if (s.getRoom() != null) {
            resp.setRoomId(s.getRoom().getId());
            resp.setRoomNumber(s.getRoom().getRoomNumber());
            resp.setRoomName(s.getRoom().getNameEn());
        }
        resp.setVenueName(s.getVenue().getName());
        resp.setVenueAddress(s.getVenue().getAddress());
        resp.setVenueHotline(s.getVenue().getHotline());
        resp.setVenueWifi(s.getVenue().getWifi());
        resp.setCustomerName(s.getCustomerName());
        resp.setCustomerPhone(s.getCustomerPhone());
        resp.setHourlyRate(s.getHourlyRate());
        resp.setNotes(s.getNotes());
        resp.setStatus(s.getStatus().name());
        resp.setStartedAt(s.getStartedAt().toString());
        resp.setItems(s.getBillItems().stream().map(i -> new BillItemResponse(
                i.getId(), i.getMenuItemId(), i.getItemNameEn(), i.getItemNameVi(),
                i.getQuantity(), i.getUnitPrice(), (long) i.getQuantity() * i.getUnitPrice()
        )).collect(Collectors.toList()));
        resp.setItemSubtotal(itemSubtotal);
        resp.setRoomCharge(roomCharge);
        resp.setGrandTotal(roomCharge + itemSubtotal);
        resp.setElapsedSeconds(elapsed);
        return resp;
    }

    private BillResponse toBillResponse(Bill b, Venue venue) {
        BillResponse resp = new BillResponse();
        resp.setId(b.getId());
        resp.setBillNumber(b.getBillNumber());
        if (venue != null) {
            resp.setVenueName(venue.getName());
            resp.setVenueAddress(venue.getAddress());
            resp.setVenueHotline(venue.getHotline());
            resp.setVenueWifi(venue.getWifi());
        }
        resp.setRoomNumber(b.getRoomNumber());
        resp.setCustomerName(b.getCustomerName());
        resp.setCustomerPhone(b.getCustomerPhone());
        resp.setStartedAt(b.getStartedAt().toString());
        resp.setEndedAt(b.getEndedAt().toString());
        resp.setDurationSeconds(b.getDurationSeconds());
        resp.setHourlyRate(b.getHourlyRate());
        resp.setRoomCharge(b.getRoomCharge());
        resp.setItemSubtotal(b.getItemSubtotal());
        resp.setDiscount(b.getDiscount());
        resp.setGrandTotal(b.getGrandTotal());
        resp.setPaymentMethod(b.getPaymentMethod().name());
        resp.setAmountTendered(b.getAmountTendered());
        resp.setChangeDue(b.getChangeDue());
        resp.setCreatedBy(b.getCreatedBy());
        resp.setCreatedAt(b.getCreatedAt().toString());
        if (b.getSession() != null) {
            resp.setItems(b.getSession().getBillItems().stream().map(i -> new BillItemResponse(
                    i.getId(), i.getMenuItemId(), i.getItemNameEn(), i.getItemNameVi(),
                    i.getQuantity(), i.getUnitPrice(), (long) i.getQuantity() * i.getUnitPrice()
            )).collect(Collectors.toList()));
        }
        return resp;
    }

    private void notifyVenue(String venueId) {
        wsController.notifyRoomUpdate(venueId, getRoomStatusMap(UUID.fromString(venueId)));
        wsController.notifyDashboardUpdate(venueId, getDashboardData(UUID.fromString(venueId)));
    }

    private Map<String, Object> getRoomStatusMap(UUID venueId) {
        List<Room> rooms = roomRepository.findByVenueIdOrderByRoomNumber(venueId);
        return Map.of("rooms", rooms.stream().map(r -> {
            Map<String, Object> m = new java.util.HashMap<>();
            m.put("id", r.getId().toString());
            m.put("roomNumber", r.getRoomNumber());
            m.put("nameEn", Objects.requireNonNullElse(r.getNameEn(), ""));
            m.put("nameVi", Objects.requireNonNullElse(r.getNameVi(), ""));
            m.put("area", Objects.requireNonNullElse(r.getArea(), ""));
            m.put("status", r.getStatus().name());
            m.put("hourlyRate", r.getHourlyRate());
            return m;
        }).collect(Collectors.toList()));
    }

    public DashboardResponse getDashboardData(UUID venueId) {
        List<Session> active = sessionRepository.findByVenueIdAndStatus(venueId, Session.SessionStatus.ACTIVE);
        LocalDateTime todayStart = LocalDateTime.now().toLocalDate().atStartOfDay();
        LocalDateTime todayEnd = todayStart.plusDays(1);
        List<Bill> todayBills = billRepository.findByVenueIdAndCreatedAtBetweenOrderByCreatedAtDesc(venueId, todayStart, todayEnd);

        DashboardResponse resp = new DashboardResponse();
        resp.setTodayRevenue(todayBills.stream().mapToLong(Bill::getGrandTotal).sum());
        resp.setActiveSessions(active.size());
        resp.setBillsClosed(todayBills.size());
        resp.setTotalRooms((int) roomRepository.countByVenueId(venueId));
        resp.setRoomRevenue(todayBills.stream().mapToLong(Bill::getRoomCharge).sum());
        resp.setItemRevenue(todayBills.stream().mapToLong(Bill::getItemSubtotal).sum());
        return resp;
    }

    public List<BillResponse> getTodayBills(UUID venueId) {
        LocalDateTime todayStart = LocalDateTime.now().toLocalDate().atStartOfDay();
        LocalDateTime todayEnd = todayStart.plusDays(1);
        Venue venue = venueRepository.findById(venueId).orElse(null);
        return billRepository.findByVenueIdAndCreatedAtBetweenOrderByCreatedAtDesc(venueId, todayStart, todayEnd)
                .stream().map(b -> toBillResponse(b, venue)).collect(Collectors.toList());
    }

    public BillResponse getBill(UUID venueId, UUID billId) {
        Venue venue = venueRepository.findById(venueId).orElse(null);
        Bill bill = billRepository.findById(billId)
                .orElseThrow(() -> new RuntimeException("Bill not found"));
        return toBillResponse(bill, venue);
    }

    public List<BillResponse> getAllBills(UUID venueId) {
        Venue venue = venueRepository.findById(venueId).orElse(null);
        return billRepository.findByVenueIdOrderByCreatedAtDesc(venueId)
                .stream().map(b -> toBillResponse(b, venue)).collect(Collectors.toList());
    }

    @Transactional
    public BillResponse createManualBill(UUID venueId, ManualBillRequest request, String username) {
        Venue venue = venueRepository.findById(venueId).orElseThrow();

        // Look up existing room by room number if provided
        Room room = null;
        if (request.getRoomNumber() != null && !request.getRoomNumber().isBlank()) {
            room = roomRepository.findByVenueIdOrderByRoomNumber(venueId).stream()
                    .filter(r -> r.getRoomNumber().equals(request.getRoomNumber()))
                    .findFirst().orElse(null);
        }

        // Create session
        Session session = new Session();
        session.setVenue(venue);
        session.setRoom(room);
        session.setCustomerName(request.getCustomerName() != null ? request.getCustomerName() : "Walk-in");
        session.setCustomerPhone(request.getCustomerPhone());
        session.setHourlyRate(request.getHourlyRate() != null ? request.getHourlyRate() : 0L);
        session.setStatus(Session.SessionStatus.ACTIVE);
        session.setStartedAt(LocalDateTime.parse(request.getStartedAt()));
        session.setCreatedBy(username);
        session = sessionRepository.save(session);

        // Add manual items
        if (request.getItems() != null) {
            for (ManualBillRequest.ManualBillItem mi : request.getItems()) {
                BillItem item = new BillItem();
                item.setSession(session);
                item.setMenuItemId(null);
                item.setItemNameEn(mi.getItemNameEn());
                item.setItemNameVi(mi.getItemNameVi());
                item.setQuantity(mi.getQuantity());
                item.setUnitPrice(mi.getUnitPrice());
                billItemRepository.save(item);
                session.getBillItems().add(item);
            }
        }

        // Close immediately
        LocalDateTime endAt = LocalDateTime.parse(request.getEndedAt());
        session.setEndedAt(endAt);
        session.setStatus(Session.SessionStatus.CLOSED);
        sessionRepository.save(session);

        long durationSeconds = java.time.Duration.between(session.getStartedAt(), endAt).getSeconds();
        long rate = session.getHourlyRate();
        long roomCharge = (long) Math.ceil(durationSeconds / 3600.0 * rate);
        long itemSubtotal = session.getBillItems().stream().mapToLong(i -> i.getQuantity() * i.getUnitPrice()).sum();
        long discount = request.getDiscount() != null ? request.getDiscount() : 0L;
        long grandTotal = roomCharge + itemSubtotal - discount;

        String billNumber = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss")) + "-M" +
                System.currentTimeMillis() % 10000;

        Bill bill = new Bill();
        bill.setSession(session);
        bill.setBillNumber(billNumber);
        bill.setVenueId(venueId);
        bill.setRoomNumber(request.getRoomNumber() != null ? request.getRoomNumber() : room.getRoomNumber());
        bill.setCustomerName(session.getCustomerName());
        bill.setCustomerPhone(session.getCustomerPhone());
        bill.setStartedAt(session.getStartedAt());
        bill.setEndedAt(endAt);
        bill.setDurationSeconds(durationSeconds);
        bill.setHourlyRate(rate);
        bill.setRoomCharge(roomCharge);
        bill.setItemSubtotal(itemSubtotal);
        bill.setDiscount(discount);
        bill.setGrandTotal(grandTotal);
        bill.setPaymentMethod(request.getPaymentMethod() != null
                ? Bill.PaymentMethod.valueOf(request.getPaymentMethod().toUpperCase())
                : Bill.PaymentMethod.CASH);
        bill.setAmountTendered(request.getAmountTendered());
        bill.setChangeDue(request.getAmountTendered() != null ? request.getAmountTendered() - grandTotal : null);
        bill.setCreatedBy(username);

        bill = billRepository.save(bill);

        notifyVenue(venueId.toString());
        return toBillResponse(bill, venue);
    }
}
