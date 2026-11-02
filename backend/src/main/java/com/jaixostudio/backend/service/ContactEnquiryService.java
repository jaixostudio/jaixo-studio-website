package com.jaixostudio.backend.service;

import com.jaixostudio.backend.dto.EnquiryRequestDto;
import com.jaixostudio.backend.entity.ContactEnquiry;
import com.jaixostudio.backend.exception.ResourceNotFoundException;
import com.jaixostudio.backend.repository.ContactEnquiryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

/**
 * Service managing client inquiries submitted through the contact pages or modals.
 */
@Service
public class ContactEnquiryService {

    private final ContactEnquiryRepository enquiryRepository;

    public ContactEnquiryService(ContactEnquiryRepository enquiryRepository) {
        this.enquiryRepository = enquiryRepository;
    }

    @Transactional(readOnly = true)
    public List<ContactEnquiry> getAllEnquiries() {
        return enquiryRepository.findAllByOrderByCreatedAtDesc();
    }

    @Transactional(readOnly = true)
    public List<ContactEnquiry> getEnquiriesByStatus(String status) {
        return enquiryRepository.findByStatusOrderByCreatedAtDesc(status);
    }

    @Transactional
    public ContactEnquiry createEnquiry(EnquiryRequestDto dto) {
        ContactEnquiry enquiry = new ContactEnquiry();
        enquiry.setId("enq-" + System.currentTimeMillis() + "-" + UUID.randomUUID().toString().substring(0, 4));
        String ref = "JX-" + java.time.Year.now().getValue() + "-" + String.format("%04d", (int)(Math.random() * 9000 + 1000));
        enquiry.setReferenceNumber(ref);
        enquiry.setName(dto.getName());
        enquiry.setEmail(dto.getEmail());
        enquiry.setPhone(dto.getPhone());
        enquiry.setService(dto.getService());
        enquiry.setBudget(dto.getBudget());
        enquiry.setTimeline(dto.getTimeline());
        enquiry.setDescription(dto.getDescription());
        enquiry.setStatus("New");
        enquiry.setCreatedAt(LocalDateTime.now());

        return enquiryRepository.save(enquiry);
    }

    @Transactional
    public ContactEnquiry updateEnquiryStatus(String id, String status, String internalNotes) {
        ContactEnquiry enquiry = enquiryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Enquiry not found with id: " + id));

        enquiry.setStatus(status);
        if (internalNotes != null) {
            enquiry.setInternalNotes(internalNotes);
        }
        return enquiryRepository.save(enquiry);
    }

    @Transactional
    public void deleteEnquiry(String id) {
        if (!enquiryRepository.existsById(id)) {
            throw new ResourceNotFoundException("Enquiry not found with id: " + id);
        }
        enquiryRepository.deleteById(id);
    }
}
