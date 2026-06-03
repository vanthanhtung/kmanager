package com.kmanager.dto;

import java.util.List;
import java.util.UUID;

public class SessionResponse {
    private UUID id;
    private UUID roomId;
    private String roomNumber;
    private String roomName;
    private String venueName;
    private String venueAddress;
    private String venueHotline;
    private String venueWifi;
    private String customerName;
    private String customerPhone;
    private Long hourlyRate;
    private String notes;
    private String status;
    private String startedAt;
    private List<BillItemResponse> items;
    private Long itemSubtotal;
    private Long roomCharge;
    private Long grandTotal;
    private long elapsedSeconds;

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public UUID getRoomId() { return roomId; }
    public void setRoomId(UUID roomId) { this.roomId = roomId; }
    public String getRoomNumber() { return roomNumber; }
    public void setRoomNumber(String roomNumber) { this.roomNumber = roomNumber; }
    public String getRoomName() { return roomName; }
    public void setRoomName(String roomName) { this.roomName = roomName; }
    public String getVenueName() { return venueName; }
    public void setVenueName(String venueName) { this.venueName = venueName; }
    public String getVenueAddress() { return venueAddress; }
    public void setVenueAddress(String venueAddress) { this.venueAddress = venueAddress; }
    public String getVenueHotline() { return venueHotline; }
    public void setVenueHotline(String venueHotline) { this.venueHotline = venueHotline; }
    public String getVenueWifi() { return venueWifi; }
    public void setVenueWifi(String venueWifi) { this.venueWifi = venueWifi; }
    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }
    public String getCustomerPhone() { return customerPhone; }
    public void setCustomerPhone(String customerPhone) { this.customerPhone = customerPhone; }
    public Long getHourlyRate() { return hourlyRate; }
    public void setHourlyRate(Long hourlyRate) { this.hourlyRate = hourlyRate; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getStartedAt() { return startedAt; }
    public void setStartedAt(String startedAt) { this.startedAt = startedAt; }
    public List<BillItemResponse> getItems() { return items; }
    public void setItems(List<BillItemResponse> items) { this.items = items; }
    public Long getItemSubtotal() { return itemSubtotal; }
    public void setItemSubtotal(Long itemSubtotal) { this.itemSubtotal = itemSubtotal; }
    public Long getRoomCharge() { return roomCharge; }
    public void setRoomCharge(Long roomCharge) { this.roomCharge = roomCharge; }
    public Long getGrandTotal() { return grandTotal; }
    public void setGrandTotal(Long grandTotal) { this.grandTotal = grandTotal; }
    public long getElapsedSeconds() { return elapsedSeconds; }
    public void setElapsedSeconds(long elapsedSeconds) { this.elapsedSeconds = elapsedSeconds; }
}
