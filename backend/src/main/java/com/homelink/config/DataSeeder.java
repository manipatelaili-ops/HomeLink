package com.homelink.config;

import com.homelink.model.*;
import com.homelink.repository.InquiryRepository;
import com.homelink.repository.PropertyRepository;
import com.homelink.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PropertyRepository propertyRepository;
    private final InquiryRepository inquiryRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(UserRepository userRepository,
                      PropertyRepository propertyRepository,
                      InquiryRepository inquiryRepository,
                      PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.propertyRepository = propertyRepository;
        this.inquiryRepository = inquiryRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() > 0) {
            return; // Data already seeded
        }

        System.out.println(">>> Seeding HomeLink university demo data...");

        // 1. Create Default Demo Users
        User owner1 = new User("Rajesh Sharma (Direct Owner)", "owner@homelink.com",
                passwordEncoder.encode("Owner@123"), Role.ROLE_OWNER, "+91 98765 43210");
        owner1.setAvatarUrl("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80");
        userRepository.save(owner1);

        User owner2 = new User("Priya Deshmukh (Direct Owner)", "priya.owner@homelink.com",
                passwordEncoder.encode("Owner@123"), Role.ROLE_OWNER, "+91 91234 56789");
        owner2.setAvatarUrl("https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80");
        userRepository.save(owner2);

        User tenant = new User("Aarav Mehta (Tenant)", "tenant@homelink.com",
                passwordEncoder.encode("Tenant@123"), Role.ROLE_TENANT, "+91 98888 77777");
        tenant.setAvatarUrl("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80");
        userRepository.save(tenant);

        // 2. Create Realistic Properties
        Property p1 = new Property();
        p1.setTitle("Sunlit 2BHK Near Tech Park & Metro Station");
        p1.setDescription("Spacious, well-ventilated 2BHK apartment directly from owner. Zero broker fees. Features modular Italian kitchen, high-speed fiber internet ready, 24/7 power backup, and quiet gated community. Ideal for IT professionals and college faculty.");
        p1.setPropertyType(PropertyType.APARTMENT);
        p1.setFurnishing(FurnishingType.FURNISHED);
        p1.setAddress("402, Green Glen Heights, Bellandur Outer Ring Rd");
        p1.setCity("Bangalore");
        p1.setState("Karnataka");
        p1.setPincode("560103");
        p1.setRentPrice(32000.0);
        p1.setDepositAmount(64000.0);
        p1.setBedrooms(2);
        p1.setBathrooms(2);
        p1.setAreaSqFt(1150);
        p1.setIsAvailable(true);
        p1.setOwner(owner1);
        p1.setImages(Arrays.asList(
                "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80"
        ));
        p1.setAmenities(Arrays.asList("High-Speed WiFi", "24/7 Power Backup", "Gated Security", "Covered Car Parking", "Modular Kitchen", "Gym Access", "Balcony"));
        propertyRepository.save(p1);

        Property p2 = new Property();
        p2.setTitle("Modern 1BHK Studio Apartment with Sea Breeze");
        p2.setDescription("Fully furnished stylish 1BHK studio located in peaceful residential lane. Within walking distance to cafes and suburban railway. Directly listed by owner without brokerage hassle.");
        p2.setPropertyType(PropertyType.STUDIO);
        p2.setFurnishing(FurnishingType.FURNISHED);
        p2.setAddress("Flat 3B, Palm View Enclave, Bandra West");
        p2.setCity("Mumbai");
        p2.setState("Maharashtra");
        p2.setPincode("400050");
        p2.setRentPrice(42000.0);
        p2.setDepositAmount(84000.0);
        p2.setBedrooms(1);
        p2.setBathrooms(1);
        p2.setAreaSqFt(650);
        p2.setIsAvailable(true);
        p2.setOwner(owner2);
        p2.setImages(Arrays.asList(
                "https://images.unsplash.com/photo-1502005229762-ae1b464002b4?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80"
        ));
        p2.setAmenities(Arrays.asList("Air Conditioning", "High-Speed WiFi", "Modular Kitchen", "Elevator", "24/7 Security", "Washing Machine"));
        propertyRepository.save(p2);

        Property p3 = new Property();
        p3.setTitle("Premium 3BHK Independent Villa with Private Lawn");
        p3.setDescription("Serene 3-bedroom independent duplex villa surrounded by greenery. Zero broker involved — deal directly with the owner. Ample parking for 2 cars, solar water heating, and pet friendly.");
        p3.setPropertyType(PropertyType.VILLA);
        p3.setFurnishing(FurnishingType.SEMI_FURNISHED);
        p3.setAddress("Villa 18, Whispering Palms, Baner Pashan Link Rd");
        p3.setCity("Pune");
        p3.setState("Maharashtra");
        p3.setPincode("411045");
        p3.setRentPrice(45000.0);
        p3.setDepositAmount(90000.0);
        p3.setBedrooms(3);
        p3.setBathrooms(3);
        p3.setAreaSqFt(2200);
        p3.setIsAvailable(true);
        p3.setOwner(owner1);
        p3.setImages(Arrays.asList(
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
        ));
        p3.setAmenities(Arrays.asList("Private Garden", "Covered Car Parking", "Pet Friendly", "Solar Water Heater", "Gated Security", "Power Backup"));
        propertyRepository.save(p3);

        Property p4 = new Property();
        p4.setTitle("Cozy Single Sharing Room in Premium Student & Tech Co-Living");
        p4.setDescription("Hassle-free student & professional accommodation. Includes housekeeping, daily breakfast, 300 Mbps WiFi, and dedicated work desk. No middleman, no brokerage, straightforward owner contract.");
        p4.setPropertyType(PropertyType.PG_CO_LIVING);
        p4.setFurnishing(FurnishingType.FURNISHED);
        p4.setAddress("Plot 88, Cyber City Road, Madhapur");
        p4.setCity("Hyderabad");
        p4.setState("Telangana");
        p4.setPincode("500081");
        p4.setRentPrice(14500.0);
        p4.setDepositAmount(20000.0);
        p4.setBedrooms(1);
        p4.setBathrooms(1);
        p4.setAreaSqFt(320);
        p4.setIsAvailable(true);
        p4.setOwner(owner2);
        p4.setImages(Arrays.asList(
                "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80"
        ));
        p4.setAmenities(Arrays.asList("High-Speed WiFi", "Air Conditioning", "Housekeeping", "Study Desk", "CCTV Security", "Water Purifier"));
        propertyRepository.save(p4);

        Property p5 = new Property();
        p5.setTitle("Elegant 2BHK High-Rise with Panoramic City View");
        p5.setDescription("Stunning high-floor apartment overlooking golf course green spaces. Zero brokerage direct listing. Modern clubhouse, swimming pool, badminton court, and supermarket within complex.");
        p5.setPropertyType(PropertyType.APARTMENT);
        p5.setFurnishing(FurnishingType.SEMI_FURNISHED);
        p5.setAddress("Tower 7, Floor 14, Golf Course Extension Rd");
        p5.setCity("Delhi NCR");
        p5.setState("Haryana");
        p5.setPincode("122018");
        p5.setRentPrice(36000.0);
        p5.setDepositAmount(72000.0);
        p5.setBedrooms(2);
        p5.setBathrooms(2);
        p5.setAreaSqFt(1350);
        p5.setIsAvailable(true);
        p5.setOwner(owner1);
        p5.setImages(Arrays.asList(
                "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80"
        ));
        p5.setAmenities(Arrays.asList("Swimming Pool", "Clubhouse", "Gym Access", "24/7 Security", "Covered Car Parking", "Elevator", "Power Backup"));
        propertyRepository.save(p5);

        // 3. Create Demo Inquiry
        Inquiry demoInquiry = new Inquiry();
        demoInquiry.setProperty(p1);
        demoInquiry.setTenant(tenant);
        demoInquiry.setMessage("Hi Rajesh, I am an IT engineer working near Bellandur. I saw your listing on HomeLink and love the apartment. Could we schedule a walkthrough this coming Saturday?");
        demoInquiry.setPhone("+91 98888 77777");
        demoInquiry.setPreferredVisitDate(LocalDate.now().plusDays(2));
        demoInquiry.setStatus(InquiryStatus.PENDING);
        inquiryRepository.save(demoInquiry);

        System.out.println(">>> HomeLink Demo data seeded successfully!");
        System.out.println(">>> Demo Owner: owner@homelink.com / Owner@123");
        System.out.println(">>> Demo Tenant: tenant@homelink.com / Tenant@123");
    }
}
