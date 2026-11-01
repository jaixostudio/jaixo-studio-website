package com.jaixostudio.backend.service;

import com.jaixostudio.backend.entity.SiteConfigEntity;
import com.jaixostudio.backend.repository.SiteConfigRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service managing Studio branding, contact coordinates, and homepage headline configuration.
 */
@Service
public class SiteConfigService {

    private final SiteConfigRepository siteConfigRepository;

    public SiteConfigService(SiteConfigRepository siteConfigRepository) {
        this.siteConfigRepository = siteConfigRepository;
    }

    @Transactional(readOnly = true)
    public SiteConfigEntity getSiteConfig() {
        return siteConfigRepository.findById(1L).orElseGet(() -> {
            SiteConfigEntity config = new SiteConfigEntity();
            config.setId(1L);
            config.setBrandName("JAIXO STUDIO");
            config.setTagline("CREATE BEYOND LIMITS");
            config.setPositioning("A modern creative design studio providing professional digital design and web development services to individuals, businesses, startups and organisations.");
            config.setHeroHeadline("Designs That Make Your Brand Stand Out.");
            config.setHeroSubheadline("From compelling visual identities to professional websites, we transform ideas into meaningful digital experiences.");
            config.setInstagramHandle("@jaixo_studio");
            config.setInstagramUrl("https://www.instagram.com/jaixo_studio");
            config.setWhatsappNumber("+91 9566308652");
            config.setContactEmail("jaixostudio@gmail.com");
            config.setContactPhone("+91 9566308652");
            config.setLocation("India • Global Remote Collaboration");
            config.setWorkingHours("Mon – Sat: 10:00 AM – 7:30 PM IST");
            return siteConfigRepository.save(config);
        });
    }

    @Transactional
    public SiteConfigEntity updateSiteConfig(SiteConfigEntity updated) {
        SiteConfigEntity existing = getSiteConfig();

        if (updated.getBrandName() != null) existing.setBrandName(updated.getBrandName());
        if (updated.getTagline() != null) existing.setTagline(updated.getTagline());
        if (updated.getPositioning() != null) existing.setPositioning(updated.getPositioning());
        if (updated.getHeroHeadline() != null) existing.setHeroHeadline(updated.getHeroHeadline());
        if (updated.getHeroSubheadline() != null) existing.setHeroSubheadline(updated.getHeroSubheadline());
        if (updated.getInstagramHandle() != null) existing.setInstagramHandle(updated.getInstagramHandle());
        if (updated.getInstagramUrl() != null) existing.setInstagramUrl(updated.getInstagramUrl());
        if (updated.getWhatsappNumber() != null) existing.setWhatsappNumber(updated.getWhatsappNumber());
        if (updated.getContactEmail() != null) existing.setContactEmail(updated.getContactEmail());
        if (updated.getContactPhone() != null) existing.setContactPhone(updated.getContactPhone());
        if (updated.getLocation() != null) existing.setLocation(updated.getLocation());
        if (updated.getWorkingHours() != null) existing.setWorkingHours(updated.getWorkingHours());

        return siteConfigRepository.save(existing);
    }
}
