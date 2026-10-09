package com.homelink.dto;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public class InquiryRequestDto {

    @NotNull(message = "Property ID is required")
    private Long propertyId;

    private String message;

    private String phone;

    private LocalDate preferredVisitDate;

    public InquiryRequestDto() {}

    public Long getPropertyId() {
        return propertyId;
    }

    public void setPropertyId(Long propertyId) {
        this.propertyId = propertyId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public LocalDate getPreferredVisitDate() {
        return preferredVisitDate;
    }

    public void setPreferredVisitDate(LocalDate preferredVisitDate) {
        this.preferredVisitDate = preferredVisitDate;
    }
}
