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
    private final WebSocketController wsController;

    public SessionService(SessionRepository sessionRepository, BillItemRepository billItemRepository,
                          BillRepository billRepository, RoomRepository roomRepository,
                          MenuItemRepository menuItemRepository, WebSocketController wsController) {
        this.sessionRepository = sessionRepository;
        this.billItemRepository = billItemRepository;
        this.billRepository = billRepository;
        this.roomRepository = roomRepository;
        this.menuItemRepository = menuItemRepository;
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

        LocalDateTime now = LocalDateTime.now();
        session.setEndedAt(now);
        session.setStatus(Session.SessionStatus.CLOSED);
        sessionRepository.save(session);

        long durationSeconds = java.time.Duration.between(session.getStartedAt(), now).getSeconds();
        long roomCharge = (long) Math.ceil(durationSeconds / 3600.0 * session.getHourlyRate());
        long itemSubtotal = session.getBillItems().stream()
                .mapToLong(i -> i.getQuantity() * i.getUnitPrice()).sum();
        long grandTotal = roomCharge + itemSubtotal;

        String billNumber = now.format(DateTimeFormatter.ofPattern("yyyyMMdd")) + "-" +
                String.format("%04d", billRepository.countByVenueIdAndCreatedAtBetween(venueId,
                        now.toLocalDate().atStartOfDay(), now.toLocalDate().plusDays(1).atStartOfDay()) + 1);

        Bill bill = new Bill();
        bill.setSession(session);
        bill.setBillNumber(billNumber);
        bill.setVenueId(venueId);
        bill.setRoomNumber(session.getRoom().getRoomNumber());
        bill.setCustomerName(session.getCustomerName());
        bill.setCustomerPhone(session.getCustomerPhone());
        bill.setStartedAt(session.getStartedAt());
        bill.setEndedAt(now);
        bill.setDurationSeconds(durationSeconds);
        bill.setHourlyRate(session.getHourlyRate());
        bill.setRoomCharge(roomCharge);
        bill.setItemSubtotal(itemSubtotal);
        bill.setDiscount(0L);
        bill.setGrandTotal(grandTotal);
        bill.setPaymentMethod(Bill.PaymentMethod.valueOf(request.getPaymentMethod().toUpperCase()));
        bill.setAmountTendered(request.getAmountTendered());
        bill.setChangeDue(request.getAmountTendered() != null ? request.getAmountTendered() - grandTotal : null);
        bill.setCreatedBy(username);

        bill = billRepository.save(bill);

        Room room = session.getRoom();
        room.setStatus(Room.RoomStatus.CLEANING);
        roomRepository.save(room);

        notifyVenue(venueId.toString());
        return toBillResponse(bill);
    }

    public SessionResponse getSession(UUID sessionId) {
        return toSessionResponse(sessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Session not found")));
    }

    public List<SessionResponse> getActiveSessions(UUID venueId) {
        return sessionRepository.findByVenueIdAndStatus(venueId, Session.SessionStatus.ACTIVE)
                .stream().map(this::toSessionResponse).collect(Collectors.toList());
    }

    private SessionResponse toSessionResponse(Session s) {
        long elapsed = s.getStatus() == Session.SessionStatus.ACTIVE
                ? java.time.Duration.between(s.getStartedAt(), LocalDateTime.now()).getSeconds()
                : java.time.Duration.between(s.getStartedAt(), s.getEndedAt()).getSeconds();
        long roomCharge = (long) Math.ceil(elapsed / 3600.0 * s.getHourlyRate());
        long itemSubtotal = s.getBillItems().stream().mapToLong(i -> i.getQuantity() * i.getUnitPrice()).sum();

        SessionResponse resp = new SessionResponse();
        resp.setId(s.getId());
        resp.setRoomId(s.getRoom().getId());
        resp.setRoomNumber(s.getRoom().getRoomNumber());
        resp.setRoomName(s.getRoom().getNameEn());
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

    private BillResponse toBillResponse(Bill b) {
        BillResponse resp = new BillResponse();
        resp.setId(b.getId());
        resp.setBillNumber(b.getBillNumber());
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
        return billRepository.findByVenueIdAndCreatedAtBetweenOrderByCreatedAtDesc(venueId, todayStart, todayEnd)
                .stream().map(this::toBillResponse).collect(Collectors.toList());
    }
}
