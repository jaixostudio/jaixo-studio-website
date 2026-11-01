package com.jaixostudio.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class PackagePriceUpdateDto {

    @NotBlank(message = "Service slug is required")
    private String serviceSlug;

    @NotNull(message = "Tier index is required")
    private Integer tierIndex;

    @NotBlank(message = "New price is required")
    private String newPrice;

    public PackagePriceUpdateDto() {}

    public PackagePriceUpdateDto(String serviceSlug, Integer tierIndex, String newPrice) {
        this.serviceSlug = serviceSlug;
        this.tierIndex = tierIndex;
        this.newPrice = newPrice;
    }

    public String getServiceSlug() {
        return serviceSlug;
    }

    public void setServiceSlug(String serviceSlug) {
        this.serviceSlug = serviceSlug;
    }

    public Integer getTierIndex() {
        return tierIndex;
    }

    public void setTierIndex(Integer tierIndex) {
        this.tierIndex = tierIndex;
    }

    public String getNewPrice() {
        return newPrice;
    }

    public void setNewPrice(String newPrice) {
        this.newPrice = newPrice;
    }
}
