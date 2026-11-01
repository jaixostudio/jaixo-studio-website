package com.jaixostudio.backend.controller;

import com.jaixostudio.backend.dto.ApiResponse;
import com.jaixostudio.backend.dto.EnquiryRequestDto;
import com.jaixostudio.backend.dto.EnquiryStatusDto;
import com.jaixostudio.backend.entity.ContactEnquiry;
import com.jaixostudio.backend.service.ContactEnquiryService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller exposing Contact Enquiry management endpoints.
 * Public POST for potential clients; Protected GET/PUT/DELETE for Admins.
 */
@RestController
@RequestMapping("/api/enquiries")
public class ContactEnquiryController {

    private final ContactEnquiryService enquiryService;

    public ContactEnquiryController(ContactEnquiryService enquiryService) {
        this.enquiryService = enquiryService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ContactEnquiry>>> getAllEnquiries(
            @RequestParam(required = false) String status) {
        List<ContactEnquiry> enquiries;
        if (status != null && !status.trim().isEmpty()) {
            enquiries = enquiryService.getEnquiriesByStatus(status.trim());
        } else {
            enquiries = enquiryService.getAllEnquiries();
        }
        return ResponseEntity.ok(ApiResponse.ok("Enquiries retrieved successfully", enquiries));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ContactEnquiry>> submitEnquiry(@Valid @RequestBody EnquiryRequestDto dto) {
        ContactEnquiry created = enquiryService.createEnquiry(dto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Enquiry submitted successfully", created));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<ApiResponse<ContactEnquiry>> updateStatus(
            @PathVariable String id,
            @Valid @RequestBody EnquiryStatusDto dto) {
        ContactEnquiry updated = enquiryService.updateEnquiryStatus(id, dto.getStatus());
        return ResponseEntity.ok(ApiResponse.ok("Enquiry status updated", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteEnquiry(@PathVariable String id) {
        enquiryService.deleteEnquiry(id);
        return ResponseEntity.ok(ApiResponse.ok("Enquiry deleted successfully"));
    }
}
