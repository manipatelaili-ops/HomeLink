package com.homelink.controller;

import com.homelink.dto.PropertyResponseDto;
import com.homelink.model.User;
import com.homelink.service.AuthService;
import com.homelink.service.FavoriteService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/favorites")
public class FavoriteController {

    private final FavoriteService favoriteService;
    private final AuthService authService;

    public FavoriteController(FavoriteService favoriteService, AuthService authService) {
        this.favoriteService = favoriteService;
        this.authService = authService;
    }

    @PostMapping("/{propertyId}/toggle")
    public ResponseEntity<Map<String, Object>> toggleFavorite(
            @PathVariable Long propertyId,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        User currentUser = authService.getCurrentUserEntity(userDetails.getUsername());
        boolean isFav = favoriteService.toggleFavorite(propertyId, currentUser);
        Map<String, Object> response = new HashMap<>();
        response.put("isFavorite", isFav);
        response.put("message", isFav ? "Added to favorites" : "Removed from favorites");
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<PropertyResponseDto>> getFavorites(
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        User currentUser = authService.getCurrentUserEntity(userDetails.getUsername());
        return ResponseEntity.ok(favoriteService.getUserFavorites(currentUser.getId()));
    }

    @GetMapping("/check/{propertyId}")
    public ResponseEntity<Map<String, Boolean>> checkFavorite(
            @PathVariable Long propertyId,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        User currentUser = authService.getCurrentUserEntity(userDetails.getUsername());
        boolean isFav = favoriteService.isFavorite(propertyId, currentUser.getId());
        Map<String, Boolean> res = new HashMap<>();
        res.put("isFavorite", isFav);
        return ResponseEntity.ok(res);
    }
}
