package com.homelink.service;

import com.homelink.dto.InquiryRequestDto;
import com.homelink.dto.InquiryResponseDto;
import com.homelink.model.Inquiry;
import com.homelink.model.InquiryStatus;
import com.homelink.model.Property;
import com.homelink.model.User;
import com.homelink.repository.InquiryRepository;
import com.homelink.repository.PropertyRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InquiryService {

    private final InquiryRepository inquiryRepository;
    private final PropertyRepository propertyRepository;

    public InquiryService(InquiryRepository inquiryRepository, PropertyRepository propertyRepository) {
        this.inquiryRepository = inquiryRepository;
        this.propertyRepository = propertyRepository;
    }

    @Transactional
    public InquiryResponseDto createInquiry(InquiryRequestDto dto, User tenant) {
        Property property = propertyRepository.findById(dto.getPropertyId())
                .orElseThrow(() -> new RuntimeException("Property not found with id: " + dto.getPropertyId()));

        Inquiry inquiry = new Inquiry();
        inquiry.setProperty(property);
        inquiry.setTenant(tenant);
        inquiry.setMessage(dto.getMessage() != null && !dto.getMessage().isBlank()
                ? dto.getMessage()
                : "Hello, I am interested in renting this property. Please let me know your availability for a visit.");
        inquiry.setPhone(dto.getPhone() != null && !dto.getPhone().isBlank() ? dto.getPhone() : tenant.getPhone());
        inquiry.setPreferredVisitDate(dto.getPreferredVisitDate());
        inquiry.setStatus(InquiryStatus.PENDING);

        Inquiry saved = inquiryRepository.save(inquiry);
        return new InquiryResponseDto(saved);
    }

    public List<InquiryResponseDto> getMyInquiries(Long tenantId) {
        return inquiryRepository.findByTenantIdOrderByCreatedAtDesc(tenantId).stream()
                .map(InquiryResponseDto::new)
                .collect(Collectors.toList());
    }

    public List<InquiryResponseDto> getOwnerInquiries(Long ownerId) {
        return inquiryRepository.findByPropertyOwnerIdOrderByCreatedAtDesc(ownerId).stream()
                .map(InquiryResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public InquiryResponseDto updateInquiryStatus(Long inquiryId, InquiryStatus newStatus, User owner) {
        Inquiry inquiry = inquiryRepository.findById(inquiryId)
                .orElseThrow(() -> new RuntimeException("Inquiry not found with id: " + inquiryId));

        if (!inquiry.getProperty().getOwner().getId().equals(owner.getId())) {
            throw new SecurityException("Unauthorized: You are not the owner of this property");
        }

        inquiry.setStatus(newStatus);
        Inquiry updated = inquiryRepository.save(inquiry);
        return new InquiryResponseDto(updated);
    }
}
