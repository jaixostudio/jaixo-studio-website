package com.jaixostudio.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * Entity representing client project inquiries submitted through the contact page or quick inquiry modal.
 * Maps to `contact_enquiries` table in MySQL.
 */
@Entity
@Table(name = "contact_enquiries")
public class ContactEnquiry {

    @Id
    @Column(nullable = false, length = 100)
    private String id;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(nullable = false, length = 150)
    private String email;

    @Column(length = 50)
    private String phone;

    @Column(length = 150)
    private String service;

    @Column(length = 100)
    private String budget;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false, length = 50)
    private String status = "New";

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public ContactEnquiry() {
        this.createdAt = LocalDateTime.now();
        this.status = "New";
    }

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) createdAt = LocalDateTime.now();
        if (status == null) status = "New";
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getService() {
        return service;
    }

    public void setService(String service) {
        this.service = service;
    }

    public String getBudget() {
        return budget;
    }

    public void setBudget(String budget) {
        this.budget = budget;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
