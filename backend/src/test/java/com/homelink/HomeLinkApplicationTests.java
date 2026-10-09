package com.homelink;

import com.homelink.dto.AuthRequest;
import com.homelink.dto.StatsSummaryDto;
import com.homelink.repository.PropertyRepository;
import com.homelink.service.PropertyService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class HomeLinkApplicationTests {

    @Autowired
    private PropertyService propertyService;

    @Autowired
    private PropertyRepository propertyRepository;

    @Test
    void contextLoads() {
        assertNotNull(propertyService, "PropertyService should load into Spring context");
        assertNotNull(propertyRepository, "PropertyRepository should load into Spring context");
    }

    @Test
    void testStatsCalculation() {
        StatsSummaryDto stats = propertyService.getPlatformStats();
        assertNotNull(stats);
        assertTrue(stats.getTotalProperties() >= 0);
    }
}
