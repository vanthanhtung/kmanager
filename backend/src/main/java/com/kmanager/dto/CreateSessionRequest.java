package com.kmanager.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class CreateSessionRequest {
    @NotBlank @Size(min = 2, max = 200)
    private String customerName;
    @Size(max = 20)
    private String customerPhone;
    private String notes;
    private Long hourlyRate;

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }
    public String getCustomerPhone() { return customerPhone; }
    public void setCustomerPhone(String customerPhone) { this.customerPhone = customerPhone; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public Long getHourlyRate() { return hourlyRate; }
    public void setHourlyRate(Long hourlyRate) { this.hourlyRate = hourlyRate; }
}
