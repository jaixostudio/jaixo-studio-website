package com.jaixostudio.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Entity representing a Creative Service offered by JAIXO STUDIO.
 * Maps to `services` table in MySQL.
 */
@Entity
@Table(name = "services")
public class ServiceEntity {

    @Id
    @Column(nullable = false, length = 100)
    private String id;

    @Column(nullable = false, unique = true, length = 150)
    private String slug;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(length = 1000)
    private String tagline;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "starting_price_inr", length = 100)
    private String startingPriceINR;

    @Column(length = 100)
    private String category;

    @Column(name = "preview_image", length = 1000)
    private String previewImage;

    @Column(length = 100)
    private String turnaround;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "service_included", joinColumns = @JoinColumn(name = "service_id"))
    @Column(name = "feature", length = 500)
    private List<String> included = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "service_deliverables", joinColumns = @JoinColumn(name = "service_id"))
    @Column(name = "deliverable", length = 500)
    private List<String> deliverables = new ArrayList<>();

    @Column(name = "packages_json", columnDefinition = "LONGTEXT")
    private String packagesJson;

    @Column(name = "display_order")
    private Integer displayOrder = 0;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public ServiceEntity() {
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

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTagline() {
        return tagline;
    }

    public void setTagline(String tagline) {
        this.tagline = tagline;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStartingPriceINR() {
        return startingPriceINR;
    }

    public void setStartingPriceINR(String startingPriceINR) {
        this.startingPriceINR = startingPriceINR;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getPreviewImage() {
        return previewImage;
    }

    public void setPreviewImage(String previewImage) {
        this.previewImage = previewImage;
    }

    public String getTurnaround() {
        return turnaround;
    }

    public void setTurnaround(String turnaround) {
        this.turnaround = turnaround;
    }

    public List<String> getIncluded() {
        return included;
    }

    public void setIncluded(List<String> included) {
        this.included = included != null ? included : new ArrayList<>();
    }

    public List<String> getDeliverables() {
        return deliverables;
    }

    public void setDeliverables(List<String> deliverables) {
        this.deliverables = deliverables != null ? deliverables : new ArrayList<>();
    }

    public String getPackagesJson() {
        return packagesJson;
    }

    public void setPackagesJson(String packagesJson) {
        this.packagesJson = packagesJson;
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
