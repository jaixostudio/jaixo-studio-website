package com.jaixostudio.backend.repository;

import com.jaixostudio.backend.entity.ContactEnquiry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactEnquiryRepository extends JpaRepository<ContactEnquiry, String> {
    List<ContactEnquiry> findAllByOrderByCreatedAtDesc();
    List<ContactEnquiry> findByStatusOrderByCreatedAtDesc(String status);
}
