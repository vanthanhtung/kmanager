package com.kmanager.controller;

import com.kmanager.dto.VenueResponse;
import com.kmanager.dto.CreateVenueRequest;
import com.kmanager.service.VenueService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final VenueService venueService;

    public AdminController(VenueService venueService) {
        this.venueService = venueService;
    }

    @GetMapping("/venues")
    public ResponseEntity<List<VenueResponse>> getAllVenues() {
        return ResponseEntity.ok(venueService.getAllVenues());
    }

    @GetMapping("/venues/{venueId}")
    public ResponseEntity<VenueResponse> getVenue(@PathVariable UUID venueId) {
        return ResponseEntity.ok(venueService.getVenue(venueId));
    }

    @PostMapping("/venues")
    public ResponseEntity<VenueResponse> createVenue(@Valid @RequestBody CreateVenueRequest request) {
        return ResponseEntity.ok(venueService.createVenue(request));
    }

    @PutMapping("/venues/{venueId}")
    public ResponseEntity<VenueResponse> updateVenue(
            @PathVariable UUID venueId,
            @Valid @RequestBody CreateVenueRequest request) {
        return ResponseEntity.ok(venueService.updateVenue(venueId, request));
    }

    @PutMapping("/venues/{venueId}/toggle-status")
    public ResponseEntity<Void> toggleVenueStatus(@PathVariable UUID venueId) {
        venueService.toggleVenueStatus(venueId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/venues/{venueId}")
    public ResponseEntity<Void> deleteVenue(@PathVariable UUID venueId) {
        venueService.deleteVenue(venueId);
        return ResponseEntity.ok().build();
    }
}
