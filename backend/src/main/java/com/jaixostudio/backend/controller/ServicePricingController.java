package com.jaixostudio.backend.controller;

import com.jaixostudio.backend.dto.ApiResponse;
import com.jaixostudio.backend.dto.PackagePriceUpdateDto;
import com.jaixostudio.backend.dto.ServicePriceUpdateDto;
import com.jaixostudio.backend.entity.PricingCategory;
import com.jaixostudio.backend.entity.ServiceEntity;
import com.jaixostudio.backend.service.ServiceAndPricingService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller exposing Creative Services and Pricing package management endpoints.
 */
@RestController
@RequestMapping("/api")
public class ServicePricingController {

    private final ServiceAndPricingService serviceAndPricingService;

    public ServicePricingController(ServiceAndPricingService serviceAndPricingService) {
        this.serviceAndPricingService = serviceAndPricingService;
    }

    // --- Services Endpoints ---

    @GetMapping("/services")
    public ResponseEntity<ApiResponse<List<ServiceEntity>>> getAllServices() {
        List<ServiceEntity> services = serviceAndPricingService.getAllServices();
        return ResponseEntity.ok(ApiResponse.ok("Services catalog retrieved", services));
    }

    @GetMapping("/services/{id}")
    public ResponseEntity<ApiResponse<ServiceEntity>> getServiceById(@PathVariable String id) {
        ServiceEntity service = serviceAndPricingService.getServiceById(id);
        return ResponseEntity.ok(ApiResponse.ok("Service details", service));
    }

    @PutMapping("/services/{id}/price")
    public ResponseEntity<ApiResponse<ServiceEntity>> updateServicePrice(
            @PathVariable String id,
            @Valid @RequestBody ServicePriceUpdateDto dto) {
        ServiceEntity updated = serviceAndPricingService.updateServicePrice(id, dto.getPrice());
        return ResponseEntity.ok(ApiResponse.ok("Service price updated successfully", updated));
    }

    // --- Pricing Endpoints ---

    @GetMapping("/pricing")
    public ResponseEntity<ApiResponse<List<PricingCategory>>> getAllPricingCategories() {
        List<PricingCategory> categories = serviceAndPricingService.getAllPricingCategories();
        return ResponseEntity.ok(ApiResponse.ok("Pricing tiers retrieved", categories));
    }

    @PutMapping("/pricing/package-price")
    public ResponseEntity<ApiResponse<PricingCategory>> updatePackagePrice(
            @Valid @RequestBody PackagePriceUpdateDto dto) {
        PricingCategory updated = serviceAndPricingService.updatePackagePrice(dto);
        return ResponseEntity.ok(ApiResponse.ok("Package price tier updated successfully", updated));
    }
}
