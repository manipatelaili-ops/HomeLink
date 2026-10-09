package com.homelink.dto;

import com.homelink.model.InquiryStatus;
import jakarta.validation.constraints.NotNull;

public class InquiryStatusDto {

    @NotNull(message = "Status is required")
    private InquiryStatus status;

    public InquiryStatusDto() {}

    public InquiryStatusDto(InquiryStatus status) {
        this.status = status;
    }

    public InquiryStatus getStatus() {
        return status;
    }

    public void setStatus(InquiryStatus status) {
        this.status = status;
    }
}
