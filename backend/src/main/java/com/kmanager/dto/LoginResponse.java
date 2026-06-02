package com.kmanager.dto;

public class LoginResponse {
    private String token;
    private String role;
    private String venueName;
    private String venueId;

    public LoginResponse() {}
    public LoginResponse(String token, String role, String venueName, String venueId) {
        this.token = token; this.role = role; this.venueName = venueName; this.venueId = venueId;
    }
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public String getVenueName() { return venueName; }
    public void setVenueName(String venueName) { this.venueName = venueName; }
    public String getVenueId() { return venueId; }
    public void setVenueId(String venueId) { this.venueId = venueId; }
}
