package com.jaixostudio.backend.dto;

import jakarta.validation.constraints.NotBlank;

public class ServicePriceUpdateDto {

    @NotBlank(message = "Price is required")
    private String price;

    public ServicePriceUpdateDto() {}

    public ServicePriceUpdateDto(String price) {
        this.price = price;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }
}
