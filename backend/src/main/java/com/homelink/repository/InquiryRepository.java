package com.homelink.repository;

import com.homelink.model.Inquiry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InquiryRepository extends JpaRepository<Inquiry, Long> {

    List<Inquiry> findByTenantIdOrderByCreatedAtDesc(Long tenantId);

    List<Inquiry> findByPropertyOwnerIdOrderByCreatedAtDesc(Long ownerId);

    List<Inquiry> findByPropertyIdOrderByCreatedAtDesc(Long propertyId);
}
