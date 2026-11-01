package com.jaixostudio.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Entity representing a Portfolio Project showcase in JAIXO STUDIO.
 * Maps to the `projects` table in MySQL and retains full compatibility
 * with the React frontend ProjectItem schema.
 */
@Entity
@Table(name = "projects")
public class Project {

    @Id
    @Column(nullable = false, length = 100)
    private String id;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(nullable = false, length = 100)
    private String category;

    @Column(length = 255)
    private String client;

    @Column(length = 50)
    private String year;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(length = 255)
    private String designType;

    @Column(columnDefinition = "TEXT")
    private String challenge;

    @Column(columnDefinition = "TEXT")
    private String solution;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "project_deliverables", joinColumns = @JoinColumn(name = "project_id"))
    @Column(name = "deliverable", length = 500)
    private List<String> deliverables = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "project_tools", joinColumns = @JoinColumn(name = "project_id"))
    @Column(name = "tool_name", length = 100)
    private List<String> toolsUsed = new ArrayList<>();

    @Column(name = "preview_image", length = 1000)
    private String previewImage;

    @Column(name = "full_image", length = 1000)
    private String fullImage;

    @Column(name = "is_featured")
    private Boolean featured = false;

    @Column(name = "project_date", length = 100)
    private String projectDate;

    @Column(name = "is_replaceable_placeholder")
    private Boolean isReplaceablePlaceholder = false;

    @Column(name = "external_url", length = 1000)
    private String externalUrl;

    @Column(name = "display_order")
    private Integer displayOrder = 0;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public Project() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) createdAt = LocalDateTime.now();
        if (updatedAt == null) updatedAt = LocalDateTime.now();
        if (displayOrder == null) displayOrder = 0;
        if (featured == null) featured = false;
        if (isReplaceablePlaceholder == null) isReplaceablePlaceholder = false;
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getClient() {
        return client;
    }

    public void setClient(String client) {
        this.client = client;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDesignType() {
        return designType;
    }

    public void setDesignType(String designType) {
        this.designType = designType;
    }

    public String getChallenge() {
        return challenge;
    }

    public void setChallenge(String challenge) {
        this.challenge = challenge;
    }

    public String getSolution() {
        return solution;
    }

    public void setSolution(String solution) {
        this.solution = solution;
    }

    public List<String> getDeliverables() {
        return deliverables;
    }

    public void setDeliverables(List<String> deliverables) {
        this.deliverables = deliverables != null ? deliverables : new ArrayList<>();
    }

    public List<String> getToolsUsed() {
        return toolsUsed;
    }

    public void setToolsUsed(List<String> toolsUsed) {
        this.toolsUsed = toolsUsed != null ? toolsUsed : new ArrayList<>();
    }

    public String getPreviewImage() {
        return previewImage;
    }

    public void setPreviewImage(String previewImage) {
        this.previewImage = previewImage;
    }

    public String getFullImage() {
        return fullImage;
    }

    public void setFullImage(String fullImage) {
        this.fullImage = fullImage;
    }

    public Boolean getFeatured() {
        return featured;
    }

    public void setFeatured(Boolean featured) {
        this.featured = featured;
    }

    public String getProjectDate() {
        return projectDate;
    }

    public void setProjectDate(String projectDate) {
        this.projectDate = projectDate;
    }

    public Boolean getIsReplaceablePlaceholder() {
        return isReplaceablePlaceholder;
    }

    public void setIsReplaceablePlaceholder(Boolean isReplaceablePlaceholder) {
        this.isReplaceablePlaceholder = isReplaceablePlaceholder;
    }

    public String getExternalUrl() {
        return externalUrl;
    }

    public void setExternalUrl(String externalUrl) {
        this.externalUrl = externalUrl;
    }

    public Integer getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
