package com.kmanager.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class CreateVenueRequest {
    @NotBlank @Size(max = 200)
    private String venueName;
    private String address;
    @NotBlank @Size(min = 4, max = 50)
    private String username;
    @Size(min = 6, max = 100)
    private String password;

    public String getVenueName() { return venueName; }
    public void setVenueName(String venueName) { this.venueName = venueName; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
