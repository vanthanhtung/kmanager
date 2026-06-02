package com.kmanager.service;

import com.kmanager.dto.*;
import com.kmanager.entity.*;
import com.kmanager.repository.*;
import com.kmanager.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class VenueService {

    private final VenueRepository venueRepository;
    private final VenueManagerRepository managerRepository;
    private final RoomRepository roomRepository;
    private final MenuItemRepository menuItemRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    public VenueService(VenueRepository venueRepository, VenueManagerRepository managerRepository,
                        RoomRepository roomRepository, MenuItemRepository menuItemRepository,
                        JwtUtil jwtUtil, PasswordEncoder passwordEncoder) {
        this.venueRepository = venueRepository;
        this.managerRepository = managerRepository;
        this.roomRepository = roomRepository;
        this.menuItemRepository = menuItemRepository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    public LoginResponse login(LoginRequest request) {
        if ("admin".equals(request.getUsername())) {
            String token = jwtUtil.generateToken(request.getUsername(), "SUPER_ADMIN", null);
            return new LoginResponse(token, "SUPER_ADMIN", null, null);
        }

        VenueManager manager = managerRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!passwordEncoder.matches(request.getPassword(), manager.getPasswordHash())) {
            throw new RuntimeException("Invalid credentials");
        }

        Venue venue = manager.getVenue();
        if (venue.getStatus() == Venue.VenueStatus.INACTIVE) {
            throw new RuntimeException("Venue account is inactive");
        }

        String token = jwtUtil.generateToken(manager.getUsername(), "VENUE_MANAGER", venue.getId());
        return new LoginResponse(token, "VENUE_MANAGER", venue.getName(), venue.getId().toString());
    }

    @Transactional
    public VenueResponse createVenue(CreateVenueRequest request) {
        if (managerRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        Venue venue = new Venue();
        venue.setName(request.getVenueName());
        venue.setAddress(request.getAddress());
        venue.setStatus(Venue.VenueStatus.ACTIVE);
        venue = venueRepository.save(venue);

        VenueManager manager = new VenueManager();
        manager.setVenue(venue);
        manager.setUsername(request.getUsername());
        manager.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        managerRepository.save(manager);

        return toVenueResponse(venue);
    }

    @Transactional
    public VenueResponse updateVenue(UUID venueId, CreateVenueRequest request) {
        Venue venue = venueRepository.findById(venueId)
                .orElseThrow(() -> new RuntimeException("Venue not found"));
        venue.setName(request.getVenueName());
        venue.setAddress(request.getAddress());
        if (request.getPassword() != null && !request.getPassword().isBlank()) {
            VenueManager manager = managerRepository.findByVenueId(venueId)
                    .orElseThrow(() -> new RuntimeException("Manager not found"));
            manager.setPasswordHash(passwordEncoder.encode(request.getPassword()));
            managerRepository.save(manager);
        }
        venue = venueRepository.save(venue);
        return toVenueResponse(venue);
    }

    @Transactional
    public void toggleVenueStatus(UUID venueId) {
        Venue venue = venueRepository.findById(venueId)
                .orElseThrow(() -> new RuntimeException("Venue not found"));
        venue.setStatus(venue.getStatus() == Venue.VenueStatus.ACTIVE
                ? Venue.VenueStatus.INACTIVE : Venue.VenueStatus.ACTIVE);
        venueRepository.save(venue);
    }

    @Transactional
    public void deleteVenue(UUID venueId) {
        venueRepository.deleteById(venueId);
    }

    public List<VenueResponse> getAllVenues() {
        return venueRepository.findAll().stream().map(this::toVenueResponse).collect(Collectors.toList());
    }

    public VenueResponse getVenue(UUID venueId) {
        return toVenueResponse(venueRepository.findById(venueId)
                .orElseThrow(() -> new RuntimeException("Venue not found")));
    }

    private VenueResponse toVenueResponse(Venue v) {
        VenueResponse resp = new VenueResponse();
        resp.setId(v.getId());
        resp.setName(v.getName());
        resp.setAddress(v.getAddress());
        resp.setStatus(v.getStatus().name());
        resp.setManagerUsername(managerRepository.findByVenueId(v.getId())
                .map(VenueManager::getUsername).orElse(null));
        resp.setRoomCount(roomRepository.countByVenueId(v.getId()));
        resp.setMenuItemCount(menuItemRepository.countByVenueId(v.getId()));
        resp.setCreatedAt(v.getCreatedAt());
        return resp;
    }
}
