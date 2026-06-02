package com.kmanager.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "bills")
public class Bill {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "session_id", nullable = false, unique = true)
    private Session session;

    @Column(name = "bill_number", nullable = false, unique = true, length = 20)
    private String billNumber;

    @Column(name = "venue_id", nullable = false)
    private UUID venueId;

    @Column(name = "room_number", nullable = false, length = 10)
    private String roomNumber;

    @Column(name = "customer_name", nullable = false, length = 200)
    private String customerName;

    @Column(name = "customer_phone", length = 20)
    private String customerPhone;

    @Column(name = "started_at", nullable = false)
    private LocalDateTime startedAt;

    @Column(name = "ended_at", nullable = false)
    private LocalDateTime endedAt;

    @Column(name = "duration_seconds", nullable = false)
    private Long durationSeconds;

    @Column(name = "hourly_rate", nullable = false)
    private Long hourlyRate;

    @Column(name = "room_charge", nullable = false)
    private Long roomCharge;

    @Column(name = "item_subtotal", nullable = false)
    private Long itemSubtotal;

    @Column(nullable = false)
    private Long discount = 0L;

    @Column(name = "grand_total", nullable = false)
    private Long grandTotal;

    @Column(name = "payment_method", nullable = false, length = 20)
    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;

    @Column(name = "amount_tendered")
    private Long amountTendered;

    @Column(name = "change_due")
    private Long changeDue;

    @Column(name = "created_by", nullable = false, length = 50)
    private String createdBy;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public enum PaymentMethod { CASH, TRANSFER, CARD }

    public Bill() {}

    @PrePersist protected void onCreate() { createdAt = LocalDateTime.now(); }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public Session getSession() { return session; }
    public void setSession(Session session) { this.session = session; }
    public String getBillNumber() { return billNumber; }
    public void setBillNumber(String billNumber) { this.billNumber = billNumber; }
    public UUID getVenueId() { return venueId; }
    public void setVenueId(UUID venueId) { this.venueId = venueId; }
    public String getRoomNumber() { return roomNumber; }
    public void setRoomNumber(String roomNumber) { this.roomNumber = roomNumber; }
    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }
    public String getCustomerPhone() { return customerPhone; }
    public void setCustomerPhone(String customerPhone) { this.customerPhone = customerPhone; }
    public LocalDateTime getStartedAt() { return startedAt; }
    public void setStartedAt(LocalDateTime startedAt) { this.startedAt = startedAt; }
    public LocalDateTime getEndedAt() { return endedAt; }
    public void setEndedAt(LocalDateTime endedAt) { this.endedAt = endedAt; }
    public Long getDurationSeconds() { return durationSeconds; }
    public void setDurationSeconds(Long durationSeconds) { this.durationSeconds = durationSeconds; }
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
    public PaymentMethod getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(PaymentMethod paymentMethod) { this.paymentMethod = paymentMethod; }
    public Long getAmountTendered() { return amountTendered; }
    public void setAmountTendered(Long amountTendered) { this.amountTendered = amountTendered; }
    public Long getChangeDue() { return changeDue; }
    public void setChangeDue(Long changeDue) { this.changeDue = changeDue; }
    public String getCreatedBy() { return createdBy; }
    public void setCreatedBy(String createdBy) { this.createdBy = createdBy; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}
