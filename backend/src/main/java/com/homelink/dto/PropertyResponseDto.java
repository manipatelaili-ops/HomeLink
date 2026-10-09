package com.homelink.dto;

import com.homelink.model.FurnishingType;
import com.homelink.model.Property;
import com.homelink.model.PropertyType;
import java.time.LocalDateTime;
import java.util.List;

public class PropertyResponseDto {

    private Long id;
    private String title;
    private String description;
    private PropertyType propertyType;
    private FurnishingType furnishing;
    private String address;
    private String city;
    private String state;
    private String pincode;
    private Double rentPrice;
    private Double depositAmount;
    private Integer bedrooms;
    private Integer bathrooms;
    private Integer areaSqFt;
    private Boolean isAvailable;
    private List<String> images;
    private List<String> amenities;
    private LocalDateTime createdAt;
    private UserDto owner;
    private Boolean isFavorite = false;

    public PropertyResponseDto() {}

    public PropertyResponseDto(Property p) {
        if (p != null) {
            this.id = p.getId();
            this.title = p.getTitle();
            this.description = p.getDescription();
            this.propertyType = p.getPropertyType();
            this.furnishing = p.getFurnishing();
            this.address = p.getAddress();
            this.city = p.getCity();
            this.state = p.getState();
            this.pincode = p.getPincode();
            this.rentPrice = p.getRentPrice();
            this.depositAmount = p.getDepositAmount();
            this.bedrooms = p.getBedrooms();
            this.bathrooms = p.getBathrooms();
            this.areaSqFt = p.getAreaSqFt();
            this.isAvailable = p.getIsAvailable();
            this.images = p.getImages();
            this.amenities = p.getAmenities();
            this.createdAt = p.getCreatedAt();
            if (p.getOwner() != null) {
                this.owner = new UserDto(p.getOwner());
            }
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public PropertyType getPropertyType() {
        return propertyType;
    }

    public void setPropertyType(PropertyType propertyType) {
        this.propertyType = propertyType;
    }

    public FurnishingType getFurnishing() {
        return furnishing;
    }

    public void setFurnishing(FurnishingType furnishing) {
        this.furnishing = furnishing;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getPincode() {
        return pincode;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }

    public Double getRentPrice() {
        return rentPrice;
    }

    public void setRentPrice(Double rentPrice) {
        this.rentPrice = rentPrice;
    }

    public Double getDepositAmount() {
        return depositAmount;
    }

    public void setDepositAmount(Double depositAmount) {
        this.depositAmount = depositAmount;
    }

    public Integer getBedrooms() {
        return bedrooms;
    }

    public void setBedrooms(Integer bedrooms) {
        this.bedrooms = bedrooms;
    }

    public Integer getBathrooms() {
        return bathrooms;
    }

    public void setBathrooms(Integer bathrooms) {
        this.bathrooms = bathrooms;
    }

    public Integer getAreaSqFt() {
        return areaSqFt;
    }

    public void setAreaSqFt(Integer areaSqFt) {
        this.areaSqFt = areaSqFt;
    }

    public Boolean getIsAvailable() {
        return isAvailable;
    }

    public void setIsAvailable(Boolean isAvailable) {
        this.isAvailable = isAvailable;
    }

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }

    public List<String> getAmenities() {
        return amenities;
    }

    public void setAmenities(List<String> amenities) {
        this.amenities = amenities;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public UserDto getOwner() {
        return owner;
    }

    public void setOwner(UserDto owner) {
        this.owner = owner;
    }

    public Boolean getIsFavorite() {
        return isFavorite;
    }

    public void setIsFavorite(Boolean isFavorite) {
        this.isFavorite = isFavorite;
    }
}
