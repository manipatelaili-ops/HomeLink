package com.homelink.dto;

import com.homelink.model.Inquiry;
import com.homelink.model.InquiryStatus;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class InquiryResponseDto {

    private Long id;
    private Long propertyId;
    private String propertyTitle;
    private String propertyAddress;
    private String propertyCity;
    private Double rentPrice;
    private String propertyImage;
    private UserDto tenant;
    private UserDto owner;
    private String message;
    private String phone;
    private LocalDate preferredVisitDate;
    private InquiryStatus status;
    private LocalDateTime createdAt;

    public InquiryResponseDto() {}

    public InquiryResponseDto(Inquiry inquiry) {
        if (inquiry != null) {
            this.id = inquiry.getId();
            this.message = inquiry.getMessage();
            this.phone = inquiry.getPhone();
            this.preferredVisitDate = inquiry.getPreferredVisitDate();
            this.status = inquiry.getStatus();
            this.createdAt = inquiry.getCreatedAt();

            if (inquiry.getProperty() != null) {
                this.propertyId = inquiry.getProperty().getId();
                this.propertyTitle = inquiry.getProperty().getTitle();
                this.propertyAddress = inquiry.getProperty().getAddress();
                this.propertyCity = inquiry.getProperty().getCity();
                this.rentPrice = inquiry.getProperty().getRentPrice();
                if (inquiry.getProperty().getImages() != null && !inquiry.getProperty().getImages().isEmpty()) {
                    this.propertyImage = inquiry.getProperty().getImages().get(0);
                }
                if (inquiry.getProperty().getOwner() != null) {
                    this.owner = new UserDto(inquiry.getProperty().getOwner());
                }
            }

            if (inquiry.getTenant() != null) {
                this.tenant = new UserDto(inquiry.getTenant());
            }
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPropertyId() {
        return propertyId;
    }

    public void setPropertyId(Long propertyId) {
        this.propertyId = propertyId;
    }

    public String getPropertyTitle() {
        return propertyTitle;
    }

    public void setPropertyTitle(String propertyTitle) {
        this.propertyTitle = propertyTitle;
    }

    public String getPropertyAddress() {
        return propertyAddress;
    }

    public void setPropertyAddress(String propertyAddress) {
        this.propertyAddress = propertyAddress;
    }

    public String getPropertyCity() {
        return propertyCity;
    }

    public void setPropertyCity(String propertyCity) {
        this.propertyCity = propertyCity;
    }

    public Double getRentPrice() {
        return rentPrice;
    }

    public void setRentPrice(Double rentPrice) {
        this.rentPrice = rentPrice;
    }

    public String getPropertyImage() {
        return propertyImage;
    }

    public void setPropertyImage(String propertyImage) {
        this.propertyImage = propertyImage;
    }

    public UserDto getTenant() {
        return tenant;
    }

    public void setTenant(UserDto tenant) {
        this.tenant = tenant;
    }

    public UserDto getOwner() {
        return owner;
    }

    public void setOwner(UserDto owner) {
        this.owner = owner;
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

    public InquiryStatus getStatus() {
        return status;
    }

    public void setStatus(InquiryStatus status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
