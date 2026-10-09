package com.homelink.repository;

import com.homelink.model.FurnishingType;
import com.homelink.model.Property;
import com.homelink.model.PropertyType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {

    List<Property> findByOwnerIdOrderByCreatedAtDesc(Long ownerId);

    List<Property> findTop6ByIsAvailableTrueOrderByCreatedAtDesc();

    @Query("SELECT p FROM Property p WHERE p.isAvailable = true " +
           "AND (:city IS NULL OR LOWER(p.city) LIKE LOWER(CONCAT('%', :city, '%'))) " +
           "AND (:minPrice IS NULL OR p.rentPrice >= :minPrice) " +
           "AND (:maxPrice IS NULL OR p.rentPrice <= :maxPrice) " +
           "AND (:bedrooms IS NULL OR p.bedrooms = :bedrooms) " +
           "AND (:propertyType IS NULL OR p.propertyType = :propertyType) " +
           "AND (:furnishing IS NULL OR p.furnishing = :furnishing) " +
           "AND (:keyword IS NULL OR (LOWER(p.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(p.address) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%')))) " +
           "ORDER BY p.createdAt DESC")
    List<Property> searchProperties(
            @Param("city") String city,
            @Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice,
            @Param("bedrooms") Integer bedrooms,
            @Param("propertyType") PropertyType propertyType,
            @Param("furnishing") FurnishingType furnishing,
            @Param("keyword") String keyword
    );

    long countByIsAvailableTrue();

    @Query("SELECT COUNT(DISTINCT LOWER(p.city)) FROM Property p")
    long countDistinctCities();

    @Query("SELECT COALESCE(SUM(p.rentPrice), 0.0) FROM Property p WHERE p.isAvailable = true")
    Double sumRentPrices();
}
