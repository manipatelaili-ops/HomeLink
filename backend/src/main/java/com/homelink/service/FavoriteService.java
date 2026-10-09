package com.homelink.service;

import com.homelink.dto.PropertyResponseDto;
import com.homelink.model.Favorite;
import com.homelink.model.Property;
import com.homelink.model.User;
import com.homelink.repository.FavoriteRepository;
import com.homelink.repository.PropertyRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final PropertyRepository propertyRepository;

    public FavoriteService(FavoriteRepository favoriteRepository, PropertyRepository propertyRepository) {
        this.favoriteRepository = favoriteRepository;
        this.propertyRepository = propertyRepository;
    }

    @Transactional
    public boolean toggleFavorite(Long propertyId, User user) {
        Optional<Favorite> existing = favoriteRepository.findByUserIdAndPropertyId(user.getId(), propertyId);
        if (existing.isPresent()) {
            favoriteRepository.delete(existing.get());
            return false; // Removed
        } else {
            Property property = propertyRepository.findById(propertyId)
                    .orElseThrow(() -> new RuntimeException("Property not found with id: " + propertyId));
            Favorite favorite = new Favorite(user, property);
            favoriteRepository.save(favorite);
            return true; // Added
        }
    }

    public List<PropertyResponseDto> getUserFavorites(Long userId) {
        List<Favorite> favorites = favoriteRepository.findByUserIdOrderByCreatedAtDesc(userId);
        return favorites.stream()
                .map(f -> {
                    PropertyResponseDto dto = new PropertyResponseDto(f.getProperty());
                    dto.setIsFavorite(true);
                    return dto;
                })
                .collect(Collectors.toList());
    }

    public boolean isFavorite(Long propertyId, Long userId) {
        if (userId == null) return false;
        return favoriteRepository.existsByUserIdAndPropertyId(userId, propertyId);
    }
}
