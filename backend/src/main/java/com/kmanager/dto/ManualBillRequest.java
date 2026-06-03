package com.kmanager.dto;

import java.util.List;

public class ManualBillRequest {
    private String customerName;
    private String customerPhone;
    private String roomNumber;
    private String startedAt;
    private String endedAt;
    private Long hourlyRate;
    private Long discount;
    private String paymentMethod;
    private Long amountTendered;
    private List<ManualBillItem> items;

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }
    public String getCustomerPhone() { return customerPhone; }
    public void setCustomerPhone(String customerPhone) { this.customerPhone = customerPhone; }
    public String getRoomNumber() { return roomNumber; }
    public void setRoomNumber(String roomNumber) { this.roomNumber = roomNumber; }
    public String getStartedAt() { return startedAt; }
    public void setStartedAt(String startedAt) { this.startedAt = startedAt; }
    public String getEndedAt() { return endedAt; }
    public void setEndedAt(String endedAt) { this.endedAt = endedAt; }
    public Long getHourlyRate() { return hourlyRate; }
    public void setHourlyRate(Long hourlyRate) { this.hourlyRate = hourlyRate; }
    public Long getDiscount() { return discount; }
    public void setDiscount(Long discount) { this.discount = discount; }
    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }
    public Long getAmountTendered() { return amountTendered; }
    public void setAmountTendered(Long amountTendered) { this.amountTendered = amountTendered; }
    public List<ManualBillItem> getItems() { return items; }
    public void setItems(List<ManualBillItem> items) { this.items = items; }

    public static class ManualBillItem {
        private String itemNameEn;
        private String itemNameVi;
        private int quantity;
        private Long unitPrice;

        public String getItemNameEn() { return itemNameEn; }
        public void setItemNameEn(String itemNameEn) { this.itemNameEn = itemNameEn; }
        public String getItemNameVi() { return itemNameVi; }
        public void setItemNameVi(String itemNameVi) { this.itemNameVi = itemNameVi; }
        public int getQuantity() { return quantity; }
        public void setQuantity(int quantity) { this.quantity = quantity; }
        public Long getUnitPrice() { return unitPrice; }
        public void setUnitPrice(Long unitPrice) { this.unitPrice = unitPrice; }
    }
}
