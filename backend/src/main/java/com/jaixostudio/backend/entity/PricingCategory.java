package com.jaixostudio.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * Entity representing a Pricing Structure category and tiers.
 * Maps to `pricing_categories` table in MySQL.
 */
@Entity
@Table(name = "pricing_categories")
public class PricingCategory {

    @Id
    @Column(nullable = false, length = 100)
    private String id;

    @Column(name = "service_title", nullable = false, length = 255)
    private String serviceTitle;

    @Column(name = "service_slug", nullable = false, length = 150)
    private String serviceSlug;

    @Column(name = "starting_price", length = 100)
    private String startingPrice;

    @Column(name = "pricing_note", columnDefinition = "TEXT")
    private String pricingNote;

    @Column(name = "packages_json", columnDefinition = "LONGTEXT")
    private String packagesJson;

    @Column(name = "additional_charges_json", columnDefinition = "LONGTEXT")
    private String additionalChargesJson;

    @Column(name = "display_order")
    private Integer displayOrder = 0;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public PricingCategory() {
        this.updatedAt = LocalDateTime.now();
    }

    @PrePersist
    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
        if (displayOrder == null) displayOrder = 0;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getServiceTitle() {
        return serviceTitle;
    }

    public void setServiceTitle(String serviceTitle) {
        this.serviceTitle = serviceTitle;
    }

    public String getServiceSlug() {
        return serviceSlug;
    }

    public void setServiceSlug(String serviceSlug) {
        this.serviceSlug = serviceSlug;
    }

    public String getStartingPrice() {
        return startingPrice;
    }

    public void setStartingPrice(String startingPrice) {
        this.startingPrice = startingPrice;
    }

    public String getPricingNote() {
        return pricingNote;
    }

    public void setPricingNote(String pricingNote) {
        this.pricingNote = pricingNote;
    }

    public String getPackagesJson() {
        return packagesJson;
    }

    public void setPackagesJson(String packagesJson) {
        this.packagesJson = packagesJson;
    }

    public String getAdditionalChargesJson() {
        return additionalChargesJson;
    }

    public void setAdditionalChargesJson(String additionalChargesJson) {
        this.additionalChargesJson = additionalChargesJson;
    }

    public Integer getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
