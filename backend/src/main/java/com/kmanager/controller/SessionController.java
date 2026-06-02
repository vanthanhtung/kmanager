package com.kmanager.controller;

import com.kmanager.dto.*;
import com.kmanager.service.SessionService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/sessions")
public class SessionController {

    private final SessionService sessionService;

    public SessionController(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    @PostMapping("/room/{roomId}")
    public ResponseEntity<SessionResponse> createSession(
            @PathVariable UUID roomId,
            @Valid @RequestBody CreateSessionRequest request,
            Authentication auth) {
        UUID venueId = extractVenueId(auth);
        return ResponseEntity.ok(sessionService.createSession(venueId, roomId, request, auth.getName()));
    }

    @GetMapping("/active")
    public ResponseEntity<List<SessionResponse>> getActiveSessions(Authentication auth) {
        return ResponseEntity.ok(sessionService.getActiveSessions(extractVenueId(auth)));
    }

    @GetMapping("/{sessionId}")
    public ResponseEntity<SessionResponse> getSession(@PathVariable UUID sessionId) {
        return ResponseEntity.ok(sessionService.getSession(sessionId));
    }

    @PostMapping("/{sessionId}/items")
    public ResponseEntity<SessionResponse> addItem(
            @PathVariable UUID sessionId,
            @Valid @RequestBody AddItemRequest request,
            Authentication auth) {
        return ResponseEntity.ok(sessionService.addItem(extractVenueId(auth), sessionId, request));
    }

    @PostMapping("/{sessionId}/close")
    public ResponseEntity<BillResponse> closeBill(
            @PathVariable UUID sessionId,
            @Valid @RequestBody CloseBillRequest request,
            Authentication auth) {
        return ResponseEntity.ok(sessionService.closeBill(extractVenueId(auth), sessionId, request, auth.getName()));
    }

    @GetMapping("/bills/today")
    public ResponseEntity<List<BillResponse>> getTodayBills(Authentication auth) {
        return ResponseEntity.ok(sessionService.getTodayBills(extractVenueId(auth)));
    }

    @GetMapping("/dashboard")
    public ResponseEntity<DashboardResponse> getDashboard(Authentication auth) {
        return ResponseEntity.ok(sessionService.getDashboardData(extractVenueId(auth)));
    }

    private UUID extractVenueId(Authentication auth) {
        if (auth.getCredentials() != null && !"null".equals(auth.getCredentials())) {
            return UUID.fromString(auth.getCredentials().toString());
        }
        HttpServletRequest request = ((org.springframework.web.context.request.ServletRequestAttributes)
                org.springframework.web.context.request.RequestContextHolder.currentRequestAttributes()).getRequest();
        String venueId = (String) request.getAttribute("venueId");
        if (venueId != null) return UUID.fromString(venueId);
        throw new RuntimeException("Venue ID not found");
    }
}
