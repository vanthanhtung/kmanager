package com.kmanager.dto;

import java.util.UUID;

public class BillItemResponse {
    private UUID id;
    private UUID menuItemId;
    private String itemNameEn;
    private String itemNameVi;
    private int quantity;
    private Long unitPrice;
    private Long lineTotal;

    public BillItemResponse() {}
    public BillItemResponse(UUID id, UUID menuItemId, String itemNameEn, String itemNameVi,
                            int quantity, Long unitPrice, Long lineTotal) {
        this.id = id; this.menuItemId = menuItemId; this.itemNameEn = itemNameEn;
        this.itemNameVi = itemNameVi; this.quantity = quantity;
        this.unitPrice = unitPrice; this.lineTotal = lineTotal;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
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
    public Long getLineTotal() { return lineTotal; }
    public void setLineTotal(Long lineTotal) { this.lineTotal = lineTotal; }
}
