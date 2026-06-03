package com.kmanager.dto;

import jakarta.validation.constraints.NotBlank;

public class CloseBillRequest {
    @NotBlank private String paymentMethod;
    private Long amountTendered;
    private String startedAt;
    private String endedAt;
    private Long hourlyRate;
    private Long discount;

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }
    public Long getAmountTendered() { return amountTendered; }
    public void setAmountTendered(Long amountTendered) { this.amountTendered = amountTendered; }
    public String getStartedAt() { return startedAt; }
    public void setStartedAt(String startedAt) { this.startedAt = startedAt; }
    public String getEndedAt() { return endedAt; }
    public void setEndedAt(String endedAt) { this.endedAt = endedAt; }
    public Long getHourlyRate() { return hourlyRate; }
    public void setHourlyRate(Long hourlyRate) { this.hourlyRate = hourlyRate; }
    public Long getDiscount() { return discount; }
    public void setDiscount(Long discount) { this.discount = discount; }
}
