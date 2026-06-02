package com.kmanager.controller;

import com.kmanager.dto.*;
import com.kmanager.service.VenueService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final VenueService venueService;

    public AuthController(VenueService venueService) {
        this.venueService = venueService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(venueService.login(request));
    }
}
