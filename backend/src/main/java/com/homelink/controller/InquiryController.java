package com.homelink.controller;

import com.homelink.dto.InquiryRequestDto;
import com.homelink.dto.InquiryResponseDto;
import com.homelink.dto.InquiryStatusDto;
import com.homelink.model.User;
import com.homelink.service.AuthService;
import com.homelink.service.InquiryService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inquiries")
public class InquiryController {

    private final InquiryService inquiryService;
    private final AuthService authService;

    public InquiryController(InquiryService inquiryService, AuthService authService) {
        this.inquiryService = inquiryService;
        this.authService = authService;
    }

    @PostMapping
    public ResponseEntity<InquiryResponseDto> createInquiry(
            @Valid @RequestBody InquiryRequestDto requestDto,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        User currentUser = authService.getCurrentUserEntity(userDetails.getUsername());
        InquiryResponseDto inquiry = inquiryService.createInquiry(requestDto, currentUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(inquiry);
    }

    @GetMapping("/my-inquiries")
    public ResponseEntity<List<InquiryResponseDto>> getMyInquiries(
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        User currentUser = authService.getCurrentUserEntity(userDetails.getUsername());
        return ResponseEntity.ok(inquiryService.getMyInquiries(currentUser.getId()));
    }

    @GetMapping("/owner-inquiries")
    @PreAuthorize("hasAnyRole('OWNER', 'ADMIN')")
    public ResponseEntity<List<InquiryResponseDto>> getOwnerInquiries(
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        User currentUser = authService.getCurrentUserEntity(userDetails.getUsername());
        return ResponseEntity.ok(inquiryService.getOwnerInquiries(currentUser.getId()));
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('OWNER', 'ADMIN')")
    public ResponseEntity<InquiryResponseDto> updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody InquiryStatusDto statusDto,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        User currentUser = authService.getCurrentUserEntity(userDetails.getUsername());
        return ResponseEntity.ok(inquiryService.updateInquiryStatus(id, statusDto.getStatus(), currentUser));
    }
}
