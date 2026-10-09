package com.homelink.service;

import com.homelink.dto.PropertyRequestDto;
import com.homelink.dto.PropertyResponseDto;
import com.homelink.dto.StatsSummaryDto;
import com.homelink.model.FurnishingType;
import com.homelink.model.Property;
import com.homelink.model.PropertyType;
import com.homelink.model.Role;
import com.homelink.model.User;
import com.homelink.repository.FavoriteRepository;
import com.homelink.repository.InquiryRepository;
import com.homelink.repository.PropertyRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PropertyService {

    private final PropertyRepository propertyRepository;
    private final FavoriteRepository favoriteRepository;
    private final InquiryRepository inquiryRepository;

    public PropertyService(PropertyRepository propertyRepository,
                           FavoriteRepository favoriteRepository,
                           InquiryRepository inquiryRepository) {
        this.propertyRepository = propertyRepository;
        this.favoriteRepository = favoriteRepository;
        this.inquiryRepository = inquiryRepository;
    }

    public List<PropertyResponseDto> searchProperties(String city, Double minPrice, Double maxPrice,
                                                      Integer bedrooms, PropertyType propertyType,
                                                      FurnishingType furnishing, String keyword, Long currentUserId) {
        List<Property> properties = propertyRepository.searchProperties(
                city != null && !city.isBlank() ? city.trim() : null,
                minPrice,
                maxPrice,
                bedrooms,
                propertyType,
                furnishing,
                keyword != null && !keyword.isBlank() ? keyword.trim() : null
        );

        return properties.stream()
                .map(p -> mapToDto(p, currentUserId))
                .collect(Collectors.toList());
    }

    public List<PropertyResponseDto> getFeaturedProperties(Long currentUserId) {
        List<Property> properties = propertyRepository.findTop6ByIsAvailableTrueOrderByCreatedAtDesc();
        return properties.stream()
                .map(p -> mapToDto(p, currentUserId))
                .collect(Collectors.toList());
    }

    public PropertyResponseDto getPropertyById(Long id, Long currentUserId) {
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Property not found with id: " + id));
        return mapToDto(property, currentUserId);
    }

    @Transactional
    public PropertyResponseDto createProperty(PropertyRequestDto dto, User owner) {
        if (owner.getRole() != Role.ROLE_OWNER && owner.getRole() != Role.ROLE_ADMIN) {
            throw new IllegalArgumentException("Only property owners or admins can list properties");
        }

        Property property = new Property();
        updateEntityFromDto(property, dto);
        property.setOwner(owner);

        Property saved = propertyRepository.save(property);
        return mapToDto(saved, owner.getId());
    }

    @Transactional
    public PropertyResponseDto updateProperty(Long id, PropertyRequestDto dto, User currentUser) {
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Property not found with id: " + id));

        if (!property.getOwner().getId().equals(currentUser.getId()) && currentUser.getRole() != Role.ROLE_ADMIN) {
            throw new SecurityException("Unauthorized: You do not own this property");
        }

        updateEntityFromDto(property, dto);
        Property updated = propertyRepository.save(property);
        return mapToDto(updated, currentUser.getId());
    }

    @Transactional
    public void deleteProperty(Long id, User currentUser) {
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Property not found with id: " + id));

        if (!property.getOwner().getId().equals(currentUser.getId()) && currentUser.getRole() != Role.ROLE_ADMIN) {
            throw new SecurityException("Unauthorized: You do not own this property");
        }

        propertyRepository.delete(property);
    }

    public List<PropertyResponseDto> getMyListings(Long ownerId) {
        return propertyRepository.findByOwnerIdOrderByCreatedAtDesc(ownerId).stream()
                .map(p -> mapToDto(p, ownerId))
                .collect(Collectors.toList());
    }

    public StatsSummaryDto getPlatformStats() {
        long totalProperties = propertyRepository.count();
        long activeListings = propertyRepository.countByIsAvailableTrue();
        long totalCities = propertyRepository.countDistinctCities();
        long totalInquiries = inquiryRepository.count();

        // Estimated brokerage saved (average broker takes 1-month rent per lease)
        Double totalRent = propertyRepository.sumRentPrices();
        double estimatedSaved = (totalRent != null ? totalRent : 0.0) * 1.0;

        return new StatsSummaryDto(totalProperties, activeListings, totalCities, totalInquiries, estimatedSaved);
    }

    private void updateEntityFromDto(Property property, PropertyRequestDto dto) {
        property.setTitle(dto.getTitle());
        property.setDescription(dto.getDescription());
        property.setPropertyType(dto.getPropertyType());
        property.setFurnishing(dto.getFurnishing());
        property.setAddress(dto.getAddress());
        property.setCity(dto.getCity());
        property.setState(dto.getState());
        property.setPincode(dto.getPincode());
        property.setRentPrice(dto.getRentPrice());
        property.setDepositAmount(dto.getDepositAmount());
        property.setBedrooms(dto.getBedrooms());
        property.setBathrooms(dto.getBathrooms());
        property.setAreaSqFt(dto.getAreaSqFt());
        property.setIsAvailable(dto.getIsAvailable() != null ? dto.getIsAvailable() : true);

        if (dto.getImages() != null) {
            property.setImages(dto.getImages());
        }
        if (dto.getAmenities() != null) {
            property.setAmenities(dto.getAmenities());
        }
    }

    private PropertyResponseDto mapToDto(Property p, Long currentUserId) {
        PropertyResponseDto dto = new PropertyResponseDto(p);
        if (currentUserId != null) {
            boolean isFav = favoriteRepository.existsByUserIdAndPropertyId(currentUserId, p.getId());
            dto.setIsFavorite(isFav);
        }
        return dto;
    }
}
