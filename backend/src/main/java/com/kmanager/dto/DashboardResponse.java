package com.kmanager.dto;

public class DashboardResponse {
    private Long todayRevenue;
    private int activeSessions;
    private int billsClosed;
    private int totalRooms;
    private Long roomRevenue;
    private Long itemRevenue;

    public Long getTodayRevenue() { return todayRevenue; }
    public void setTodayRevenue(Long todayRevenue) { this.todayRevenue = todayRevenue; }
    public int getActiveSessions() { return activeSessions; }
    public void setActiveSessions(int activeSessions) { this.activeSessions = activeSessions; }
    public int getBillsClosed() { return billsClosed; }
    public void setBillsClosed(int billsClosed) { this.billsClosed = billsClosed; }
    public int getTotalRooms() { return totalRooms; }
    public void setTotalRooms(int totalRooms) { this.totalRooms = totalRooms; }
    public Long getRoomRevenue() { return roomRevenue; }
    public void setRoomRevenue(Long roomRevenue) { this.roomRevenue = roomRevenue; }
    public Long getItemRevenue() { return itemRevenue; }
    public void setItemRevenue(Long itemRevenue) { this.itemRevenue = itemRevenue; }
}
