package com.kmanager.dto;

import jakarta.validation.constraints.NotBlank;

public class CloseBillRequest {
    @NotBlank private String paymentMethod;
    private Long amountTendered;

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }
    public Long getAmountTendered() { return amountTendered; }
    public void setAmountTendered(Long amountTendered) { this.amountTendered = amountTendered; }
}
