package com.jaixostudio.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * Entity representing global studio branding, contact details, and hero positioning.
 * Maps to `site_config` table in MySQL.
 */
@Entity
@Table(name = "site_config")
public class SiteConfigEntity {

    @Id
    private Long id = 1L;

    @Column(name = "brand_name", length = 150)
    private String brandName;

    @Column(length = 255)
    private String tagline;

    @Column(columnDefinition = "TEXT")
    private String positioning;

    @Column(name = "hero_headline", length = 255)
    private String heroHeadline;

    @Column(name = "hero_subheadline", columnDefinition = "TEXT")
    private String heroSubheadline;

    @Column(name = "instagram_handle", length = 100)
    private String instagramHandle;

    @Column(name = "instagram_url", length = 500)
    private String instagramUrl;

    @Column(name = "whatsapp_number", length = 50)
    private String whatsappNumber;

    @Column(name = "contact_email", length = 150)
    private String contactEmail;

    @Column(name = "contact_phone", length = 50)
    private String contactPhone;

    @Column(length = 255)
    private String location;

    @Column(name = "working_hours", length = 150)
    private String workingHours;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public SiteConfigEntity() {
        this.updatedAt = LocalDateTime.now();
    }

    @PrePersist
    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBrandName() {
        return brandName;
    }

    public void setBrandName(String brandName) {
        this.brandName = brandName;
    }

    public String getTagline() {
        return tagline;
    }

    public void setTagline(String tagline) {
        this.tagline = tagline;
    }

    public String getPositioning() {
        return positioning;
    }

    public void setPositioning(String positioning) {
        this.positioning = positioning;
    }

    public String getHeroHeadline() {
        return heroHeadline;
    }

    public void setHeroHeadline(String heroHeadline) {
        this.heroHeadline = heroHeadline;
    }

    public String getHeroSubheadline() {
        return heroSubheadline;
    }

    public void setHeroSubheadline(String heroSubheadline) {
        this.heroSubheadline = heroSubheadline;
    }

    public String getInstagramHandle() {
        return instagramHandle;
    }

    public void setInstagramHandle(String instagramHandle) {
        this.instagramHandle = instagramHandle;
    }

    public String getInstagramUrl() {
        return instagramUrl;
    }

    public void setInstagramUrl(String instagramUrl) {
        this.instagramUrl = instagramUrl;
    }

    public String getWhatsappNumber() {
        return whatsappNumber;
    }

    public void setWhatsappNumber(String whatsappNumber) {
        this.whatsappNumber = whatsappNumber;
    }

    public String getContactEmail() {
        return contactEmail;
    }

    public void setContactEmail(String contactEmail) {
        this.contactEmail = contactEmail;
    }

    public String getContactPhone() {
        return contactPhone;
    }

    public void setContactPhone(String contactPhone) {
        this.contactPhone = contactPhone;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getWorkingHours() {
        return workingHours;
    }

    public void setWorkingHours(String workingHours) {
        this.workingHours = workingHours;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
