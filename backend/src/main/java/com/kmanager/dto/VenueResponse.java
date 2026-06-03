package com.kmanager.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public class VenueResponse {
    private UUID id;
    private String name;
    private String address;
    private String hotline;
    private String wifi;
    private String status;
    private String managerUsername;
    private long roomCount;
    private long menuItemCount;
    private LocalDateTime lastActivity;
    private LocalDateTime createdAt;

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getHotline() { return hotline; }
    public void setHotline(String hotline) { this.hotline = hotline; }
    public String getWifi() { return wifi; }
    public void setWifi(String wifi) { this.wifi = wifi; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getManagerUsername() { return managerUsername; }
    public void setManagerUsername(String managerUsername) { this.managerUsername = managerUsername; }
    public long getRoomCount() { return roomCount; }
    public void setRoomCount(long roomCount) { this.roomCount = roomCount; }
    public long getMenuItemCount() { return menuItemCount; }
    public void setMenuItemCount(long menuItemCount) { this.menuItemCount = menuItemCount; }
    public LocalDateTime getLastActivity() { return lastActivity; }
    public void setLastActivity(LocalDateTime lastActivity) { this.lastActivity = lastActivity; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
