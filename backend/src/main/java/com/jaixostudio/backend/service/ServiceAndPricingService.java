package com.jaixostudio.backend.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jaixostudio.backend.dto.PackagePriceUpdateDto;
import com.jaixostudio.backend.entity.PricingCategory;
import com.jaixostudio.backend.entity.ServiceEntity;
import com.jaixostudio.backend.exception.BadRequestException;
import com.jaixostudio.backend.exception.ResourceNotFoundException;
import com.jaixostudio.backend.repository.PricingCategoryRepository;
import com.jaixostudio.backend.repository.ServiceRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

/**
 * Service managing Creative Services catalogs and Pricing Packages.
 */
@Service
public class ServiceAndPricingService {

    private final ServiceRepository serviceRepository;
    private final PricingCategoryRepository pricingCategoryRepository;
    private final ObjectMapper objectMapper;

    public ServiceAndPricingService(
            ServiceRepository serviceRepository,
            PricingCategoryRepository pricingCategoryRepository,
            ObjectMapper objectMapper) {
        this.serviceRepository = serviceRepository;
        this.pricingCategoryRepository = pricingCategoryRepository;
        this.objectMapper = objectMapper;
    }

    @Transactional(readOnly = true)
    public List<ServiceEntity> getAllServices() {
        return serviceRepository.findAllByOrderByDisplayOrderAsc();
    }

    @Transactional(readOnly = true)
    public ServiceEntity getServiceById(String id) {
        return serviceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found with id: " + id));
    }

    @Transactional
    public ServiceEntity updateServicePrice(String serviceId, String newPrice) {
        ServiceEntity service = serviceRepository.findById(serviceId)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found with id: " + serviceId));
        service.setStartingPriceINR(newPrice);
        return serviceRepository.save(service);
    }

    @Transactional(readOnly = true)
    public List<PricingCategory> getAllPricingCategories() {
        return pricingCategoryRepository.findAllByOrderByDisplayOrderAsc();
    }

    @Transactional
    public PricingCategory updatePackagePrice(PackagePriceUpdateDto dto) {
        PricingCategory category = pricingCategoryRepository.findByServiceSlug(dto.getServiceSlug())
                .orElseThrow(() -> new ResourceNotFoundException("Pricing category not found for slug: " + dto.getServiceSlug()));

        try {
            // Parse packages JSON array
            List<Map<String, Object>> packages = objectMapper.readValue(
                    category.getPackagesJson(),
                    new TypeReference<List<Map<String, Object>>>() {}
            );

            if (dto.getTierIndex() < 0 || dto.getTierIndex() >= packages.size()) {
                throw new BadRequestException("Invalid tier index: " + dto.getTierIndex());
            }

            packages.get(dto.getTierIndex()).put("price", dto.getNewPrice());
            category.setPackagesJson(objectMapper.writeValueAsString(packages));

            return pricingCategoryRepository.save(category);
        } catch (Exception e) {
            throw new BadRequestException("Failed to update pricing tier: " + e.getMessage());
        }
    }
}
