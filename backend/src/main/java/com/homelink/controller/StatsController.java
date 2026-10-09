package com.homelink.controller;

import com.homelink.dto.StatsSummaryDto;
import com.homelink.service.PropertyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/stats")
public class StatsController {

    private final PropertyService propertyService;

    public StatsController(PropertyService propertyService) {
        this.propertyService = propertyService;
    }

    @GetMapping
    public ResponseEntity<StatsSummaryDto> getStats() {
        return ResponseEntity.ok(propertyService.getPlatformStats());
    }
}
