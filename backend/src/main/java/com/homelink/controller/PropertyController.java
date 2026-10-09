package com.homelink.controller;

import com.homelink.dto.PropertyRequestDto;
import com.homelink.dto.PropertyResponseDto;
import com.homelink.model.FurnishingType;
import com.homelink.model.PropertyType;
import com.homelink.model.User;
import com.homelink.service.AuthService;
import com.homelink.service.PropertyService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/properties")
public class PropertyController {

    private final PropertyService propertyService;
    private final AuthService authService;

    public PropertyController(PropertyService propertyService, AuthService authService) {
        this.propertyService = propertyService;
        this.authService = authService;
    }

    @GetMapping
    public ResponseEntity<List<PropertyResponseDto>> searchProperties(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) Integer bedrooms,
            @RequestParam(required = false) PropertyType propertyType,
            @RequestParam(required = false) FurnishingType furnishing,
            @RequestParam(required = false) String keyword,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        Long currentUserId = getUserIdFromUserDetails(userDetails);
        return ResponseEntity.ok(propertyService.searchProperties(
                city, minPrice, maxPrice, bedrooms, propertyType, furnishing, keyword, currentUserId
        ));
    }

    @GetMapping("/featured")
    public ResponseEntity<List<PropertyResponseDto>> getFeaturedProperties(
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        Long currentUserId = getUserIdFromUserDetails(userDetails);
        return ResponseEntity.ok(propertyService.getFeaturedProperties(currentUserId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PropertyResponseDto> getPropertyById(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        Long currentUserId = getUserIdFromUserDetails(userDetails);
        return ResponseEntity.ok(propertyService.getPropertyById(id, currentUserId));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('OWNER', 'ADMIN')")
    public ResponseEntity<PropertyResponseDto> createProperty(
            @Valid @RequestBody PropertyRequestDto propertyRequestDto,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        User currentUser = authService.getCurrentUserEntity(userDetails.getUsername());
        PropertyResponseDto created = propertyService.createProperty(propertyRequestDto, currentUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('OWNER', 'ADMIN')")
    public ResponseEntity<PropertyResponseDto> updateProperty(
            @PathVariable Long id,
            @Valid @RequestBody PropertyRequestDto propertyRequestDto,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        User currentUser = authService.getCurrentUserEntity(userDetails.getUsername());
        return ResponseEntity.ok(propertyService.updateProperty(id, propertyRequestDto, currentUser));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('OWNER', 'ADMIN')")
    public ResponseEntity<Void> deleteProperty(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        User currentUser = authService.getCurrentUserEntity(userDetails.getUsername());
        propertyService.deleteProperty(id, currentUser);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/my-listings")
    @PreAuthorize("hasAnyRole('OWNER', 'ADMIN')")
    public ResponseEntity<List<PropertyResponseDto>> getMyListings(
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        User currentUser = authService.getCurrentUserEntity(userDetails.getUsername());
        return ResponseEntity.ok(propertyService.getMyListings(currentUser.getId()));
    }

    private Long getUserIdFromUserDetails(UserDetails userDetails) {
        if (userDetails != null) {
            try {
                User user = authService.getCurrentUserEntity(userDetails.getUsername());
                return user.getId();
            } catch (Exception ignored) {}
        }
        return null;
    }
}
