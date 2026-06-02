package com.kmanager.controller;

import com.kmanager.entity.*;
import com.kmanager.repository.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class ResourceController {

    private final RoomRepository roomRepository;
    private final MenuItemRepository menuItemRepository;
    private final MenuCategoryRepository menuCategoryRepository;
    private final VenueRepository venueRepository;

    public ResourceController(RoomRepository roomRepository, MenuItemRepository menuItemRepository,
                               MenuCategoryRepository menuCategoryRepository, VenueRepository venueRepository) {
        this.roomRepository = roomRepository;
        this.menuItemRepository = menuItemRepository;
        this.menuCategoryRepository = menuCategoryRepository;
        this.venueRepository = venueRepository;
    }

    @GetMapping("/rooms")
    public ResponseEntity<List<Room>> getRooms(HttpServletRequest request) {
        UUID venueId = extractVenueId(request);
        return ResponseEntity.ok(roomRepository.findByVenueIdOrderByRoomNumber(venueId));
    }

    @PostMapping("/rooms")
    public ResponseEntity<Room> createRoom(@RequestBody Room room, HttpServletRequest request) {
        UUID venueId = extractVenueId(request);
        room.setVenue(venueRepository.findById(venueId).orElseThrow());
        room.setStatus(Room.RoomStatus.AVAILABLE);
        return ResponseEntity.ok(roomRepository.save(room));
    }

    @GetMapping("/rooms/{roomId}")
    public ResponseEntity<Room> getRoom(@PathVariable UUID roomId) {
        return ResponseEntity.ok(roomRepository.findById(roomId).orElseThrow());
    }

    @PutMapping("/rooms/{roomId}")
    public ResponseEntity<Room> updateRoom(@PathVariable UUID roomId, @RequestBody Room updates) {
        Room room = roomRepository.findById(roomId).orElseThrow();
        if (updates.getNameEn() != null) room.setNameEn(updates.getNameEn());
        if (updates.getNameVi() != null) room.setNameVi(updates.getNameVi());
        if (updates.getArea() != null) room.setArea(updates.getArea());
        if (updates.getHourlyRate() != null) room.setHourlyRate(updates.getHourlyRate());
        if (updates.getNotes() != null) room.setNotes(updates.getNotes());
        if (updates.getStatus() != null) room.setStatus(updates.getStatus());
        if (updates.getCategory() != null) room.setCategory(updates.getCategory());
        return ResponseEntity.ok(roomRepository.save(room));
    }

    @GetMapping("/menu-items")
    public ResponseEntity<List<MenuItem>> getMenuItems(@RequestParam(defaultValue = "true") boolean active,
                                                       HttpServletRequest request) {
        UUID venueId = extractVenueId(request);
        if (active) return ResponseEntity.ok(menuItemRepository.findByVenueIdAndIsActiveTrueOrderByCode(venueId));
        return ResponseEntity.ok(menuItemRepository.findByVenueIdOrderByCode(venueId));
    }

    @GetMapping("/menu-items/{itemId}")
    public ResponseEntity<MenuItem> getMenuItem(@PathVariable UUID itemId) {
        return ResponseEntity.ok(menuItemRepository.findById(itemId).orElseThrow());
    }

    @PostMapping("/menu-items")
    public ResponseEntity<MenuItem> createMenuItem(@RequestBody java.util.Map<String, Object> body, HttpServletRequest request) {
        UUID venueId = extractVenueId(request);
        MenuItem item = new MenuItem();
        item.setVenue(venueRepository.findById(venueId).orElseThrow());
        item.setCode((String) body.get("code"));
        item.setNameEn((String) body.get("nameEn"));
        item.setNameVi((String) body.get("nameVi"));
        item.setPrice(Long.valueOf(((Number) body.get("price")).longValue()));
        if (body.get("description") != null) item.setDescription((String) body.get("description"));
        if (body.get("imageUrl") != null) item.setImageUrl((String) body.get("imageUrl"));
        if (body.get("isActive") != null) item.setActive((Boolean) body.get("isActive"));

        String categoryId = (String) body.get("categoryId");
        if (categoryId != null) {
            item.setCategory(menuCategoryRepository.findById(UUID.fromString(categoryId)).orElseThrow());
        }
        return ResponseEntity.ok(menuItemRepository.save(item));
    }

    @PutMapping("/menu-items/{itemId}")
    public ResponseEntity<MenuItem> updateMenuItem(@PathVariable UUID itemId, @RequestBody MenuItem updates) {
        MenuItem item = menuItemRepository.findById(itemId).orElseThrow();
        if (updates.getNameEn() != null) item.setNameEn(updates.getNameEn());
        if (updates.getNameVi() != null) item.setNameVi(updates.getNameVi());
        if (updates.getCategory() != null) item.setCategory(updates.getCategory());
        if (updates.getPrice() != null) item.setPrice(updates.getPrice());
        if (updates.getDescription() != null) item.setDescription(updates.getDescription());
        if (updates.getImageUrl() != null) item.setImageUrl(updates.getImageUrl());
        return ResponseEntity.ok(menuItemRepository.save(item));
    }

    @PutMapping("/menu-items/{itemId}/toggle-active")
    public ResponseEntity<MenuItem> toggleMenuItemActive(@PathVariable UUID itemId) {
        MenuItem item = menuItemRepository.findById(itemId).orElseThrow();
        item.setActive(!item.isActive());
        return ResponseEntity.ok(menuItemRepository.save(item));
    }

    @GetMapping("/menu-categories")
    public ResponseEntity<List<MenuCategory>> getMenuCategories(HttpServletRequest request) {
        return ResponseEntity.ok(menuCategoryRepository.findByVenueIdOrderBySortOrder(extractVenueId(request)));
    }

    @PostMapping("/menu-categories")
    public ResponseEntity<MenuCategory> createMenuCategory(@RequestBody MenuCategory category, HttpServletRequest request) {
        UUID venueId = extractVenueId(request);
        category.setVenue(venueRepository.findById(venueId).orElseThrow());
        return ResponseEntity.ok(menuCategoryRepository.save(category));
    }

    private UUID extractVenueId(HttpServletRequest request) {
        String venueId = (String) request.getAttribute("venueId");
        if (venueId != null) return UUID.fromString(venueId);
        var auth = org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getCredentials() != null && !"null".equals(auth.getCredentials())) {
            return UUID.fromString(auth.getCredentials().toString());
        }
        throw new RuntimeException("Venue ID not found in request");
    }
}
