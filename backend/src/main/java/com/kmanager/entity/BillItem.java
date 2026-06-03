package com.kmanager.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "bill_items")
public class BillItem {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "session_id", nullable = false)
    private Session session;

    @Column(name = "menu_item_id")
    private UUID menuItemId;

    @Column(name = "item_name_en", nullable = false, length = 200)
    private String itemNameEn;

    @Column(name = "item_name_vi", nullable = false, length = 200)
    private String itemNameVi;

    @Column(nullable = false)
    private int quantity;

    @Column(name = "unit_price", nullable = false)
    private Long unitPrice;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public BillItem() {}

    @PrePersist protected void onCreate() { createdAt = LocalDateTime.now(); }

    public UUID getId() { return id; }
    public Session getSession() { return session; }
    public void setSession(Session session) { this.session = session; }
    public UUID getMenuItemId() { return menuItemId; }
    public void setMenuItemId(UUID menuItemId) { this.menuItemId = menuItemId; }
    public String getItemNameEn() { return itemNameEn; }
    public void setItemNameEn(String itemNameEn) { this.itemNameEn = itemNameEn; }
    public String getItemNameVi() { return itemNameVi; }
    public void setItemNameVi(String itemNameVi) { this.itemNameVi = itemNameVi; }
    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
    public Long getUnitPrice() { return unitPrice; }
    public void setUnitPrice(Long unitPrice) { this.unitPrice = unitPrice; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}
