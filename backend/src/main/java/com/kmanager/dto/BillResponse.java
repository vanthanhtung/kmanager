package com.kmanager.dto;

public class BillResponse {
    private java.util.UUID id;
    private String billNumber;
    private String roomNumber;
    private String customerName;
    private String customerPhone;
    private String startedAt;
    private String endedAt;
    private long durationSeconds;
    private Long hourlyRate;
    private Long roomCharge;
    private Long itemSubtotal;
    private Long discount;
    private Long grandTotal;
    private String paymentMethod;
    private Long amountTendered;
    private Long changeDue;
    private String createdBy;
    private String createdAt;

    public java.util.UUID getId() { return id; }
    public void setId(java.util.UUID id) { this.id = id; }
    public String getBillNumber() { return billNumber; }
    public void setBillNumber(String billNumber) { this.billNumber = billNumber; }
    public String getRoomNumber() { return roomNumber; }
    public void setRoomNumber(String roomNumber) { this.roomNumber = roomNumber; }
    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }
    public String getCustomerPhone() { return customerPhone; }
    public void setCustomerPhone(String customerPhone) { this.customerPhone = customerPhone; }
    public String getStartedAt() { return startedAt; }
    public void setStartedAt(String startedAt) { this.startedAt = startedAt; }
    public String getEndedAt() { return endedAt; }
    public void setEndedAt(String endedAt) { this.endedAt = endedAt; }
    public long getDurationSeconds() { return durationSeconds; }
    public void setDurationSeconds(long durationSeconds) { this.durationSeconds = durationSeconds; }
    public Long getHourlyRate() { return hourlyRate; }
    public void setHourlyRate(Long hourlyRate) { this.hourlyRate = hourlyRate; }
    public Long getRoomCharge() { return roomCharge; }
    public void setRoomCharge(Long roomCharge) { this.roomCharge = roomCharge; }
    public Long getItemSubtotal() { return itemSubtotal; }
    public void setItemSubtotal(Long itemSubtotal) { this.itemSubtotal = itemSubtotal; }
    public Long getDiscount() { return discount; }
    public void setDiscount(Long discount) { this.discount = discount; }
    public Long getGrandTotal() { return grandTotal; }
    public void setGrandTotal(Long grandTotal) { this.grandTotal = grandTotal; }
    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }
    public Long getAmountTendered() { return amountTendered; }
    public void setAmountTendered(Long amountTendered) { this.amountTendered = amountTendered; }
    public Long getChangeDue() { return changeDue; }
    public void setChangeDue(Long changeDue) { this.changeDue = changeDue; }
    public String getCreatedBy() { return createdBy; }
    public void setCreatedBy(String createdBy) { this.createdBy = createdBy; }
    public String getCreatedAt() { return createdAt; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }
}
