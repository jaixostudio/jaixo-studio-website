package com.jaixostudio.backend.controller;

import com.jaixostudio.backend.dto.ApiResponse;
import com.jaixostudio.backend.entity.SiteConfigEntity;
import com.jaixostudio.backend.service.SiteConfigService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controller exposing Site Configuration and Branding endpoints.
 */
@RestController
@RequestMapping("/api/config")
public class SiteConfigController {

    private final SiteConfigService siteConfigService;

    public SiteConfigController(SiteConfigService siteConfigService) {
        this.siteConfigService = siteConfigService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<SiteConfigEntity>> getSiteConfig() {
        SiteConfigEntity config = siteConfigService.getSiteConfig();
        return ResponseEntity.ok(ApiResponse.ok("Site configuration retrieved", config));
    }

    @PutMapping
    public ResponseEntity<ApiResponse<SiteConfigEntity>> updateSiteConfig(
            @RequestBody SiteConfigEntity updatedConfig) {
        SiteConfigEntity saved = siteConfigService.updateSiteConfig(updatedConfig);
        return ResponseEntity.ok(ApiResponse.ok("Site configuration updated successfully", saved));
    }
}
