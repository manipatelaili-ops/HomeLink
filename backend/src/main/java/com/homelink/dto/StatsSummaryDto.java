package com.homelink.dto;

public class StatsSummaryDto {

    private long totalProperties;
    private long totalActiveListings;
    private long totalCities;
    private long totalInquiries;
    private double estimatedBrokerageSaved;

    public StatsSummaryDto() {}

    public StatsSummaryDto(long totalProperties, long totalActiveListings, long totalCities, long totalInquiries, double estimatedBrokerageSaved) {
        this.totalProperties = totalProperties;
        this.totalActiveListings = totalActiveListings;
        this.totalCities = totalCities;
        this.totalInquiries = totalInquiries;
        this.estimatedBrokerageSaved = estimatedBrokerageSaved;
    }

    public long getTotalProperties() {
        return totalProperties;
    }

    public void setTotalProperties(long totalProperties) {
        this.totalProperties = totalProperties;
    }

    public long getTotalActiveListings() {
        return totalActiveListings;
    }

    public void setTotalActiveListings(long totalActiveListings) {
        this.totalActiveListings = totalActiveListings;
    }

    public long getTotalCities() {
        return totalCities;
    }

    public void setTotalCities(long totalCities) {
        this.totalCities = totalCities;
    }

    public long getTotalInquiries() {
        return totalInquiries;
    }

    public void setTotalInquiries(long totalInquiries) {
        this.totalInquiries = totalInquiries;
    }

    public double getEstimatedBrokerageSaved() {
        return estimatedBrokerageSaved;
    }

    public void setEstimatedBrokerageSaved(double estimatedBrokerageSaved) {
        this.estimatedBrokerageSaved = estimatedBrokerageSaved;
    }
}
