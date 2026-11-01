package com.jaixostudio.backend.config;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jaixostudio.backend.entity.*;
import com.jaixostudio.backend.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Enterprise Database Initializer.
 * Seeds initial admin credentials, branding metadata, creative services catalog,
 * pricing packages, and all 50 genuine portfolio showcase items into MySQL on first boot.
 */
@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    private final AdminUserRepository adminUserRepository;
    private final SiteConfigRepository siteConfigRepository;
    private final ServiceRepository serviceRepository;
    private final PricingCategoryRepository pricingCategoryRepository;
    private final ProjectRepository projectRepository;
    private final ContactEnquiryRepository contactEnquiryRepository;
    private final PasswordEncoder passwordEncoder;
    private final ObjectMapper objectMapper;

    public DataInitializer(
            AdminUserRepository adminUserRepository,
            SiteConfigRepository siteConfigRepository,
            ServiceRepository serviceRepository,
            PricingCategoryRepository pricingCategoryRepository,
            ProjectRepository projectRepository,
            ContactEnquiryRepository contactEnquiryRepository,
            PasswordEncoder passwordEncoder,
            ObjectMapper objectMapper) {
        this.adminUserRepository = adminUserRepository;
        this.siteConfigRepository = siteConfigRepository;
        this.serviceRepository = serviceRepository;
        this.pricingCategoryRepository = pricingCategoryRepository;
        this.projectRepository = projectRepository;
        this.contactEnquiryRepository = contactEnquiryRepository;
        this.passwordEncoder = passwordEncoder;
        this.objectMapper = objectMapper;
    }

    @Override
    public void run(String... args) {
        log.info("Starting JAIXO STUDIO database integrity verification and seeding...");
        seedAdminUser();
        seedSiteConfig();
        seedServices();
        seedPricingCategories();
        seedProjects();
        seedSampleEnquiries();
        log.info("JAIXO STUDIO database initialization completed successfully.");
    }

    private void seedAdminUser() {
        if (!adminUserRepository.existsByUsername("admin")) {
            log.info("Seeding default Administrator user [admin]...");
            AdminUser admin = new AdminUser(
                    "admin",
                    passwordEncoder.encode("jaixo2026"),
                    "JAIXO Studio Admin",
                    "ROLE_ADMIN"
            );
            adminUserRepository.save(admin);
            log.info("Default Administrator created with secure BCrypt hash.");
        }
    }

    private void seedSiteConfig() {
        if (siteConfigRepository.count() == 0) {
            log.info("Seeding default Studio site configuration...");
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
            siteConfigRepository.save(config);
        }
    }

    private void seedServices() {
        if (serviceRepository.count() == 0) {
            log.info("Seeding services catalog from servicesData.json...");
            try {
                ClassPathResource resource = new ClassPathResource("data/servicesData.json");
                if (resource.exists()) {
                    try (InputStream is = resource.getInputStream()) {
                        List<Map<String, Object>> list = objectMapper.readValue(is, new TypeReference<>() {});
                        int order = 0;
                        for (Map<String, Object> map : list) {
                            ServiceEntity s = new ServiceEntity();
                            s.setId((String) map.get("id"));
                            s.setSlug((String) map.get("slug"));
                            s.setTitle((String) map.get("title"));
                            s.setTagline((String) map.get("tagline"));
                            s.setDescription((String) map.get("description"));
                            s.setStartingPriceINR((String) map.get("startingPriceINR"));
                            s.setCategory((String) map.get("category"));
                            s.setPreviewImage((String) map.get("previewImage"));
                            s.setTurnaround((String) map.get("turnaround"));
                            s.setDisplayOrder(order++);

                            if (map.get("included") instanceof List<?> inc) {
                                List<String> incList = new ArrayList<>();
                                for (Object o : inc) incList.add(String.valueOf(o));
                                s.setIncluded(incList);
                            }

                            if (map.get("deliverables") instanceof List<?> del) {
                                List<String> delList = new ArrayList<>();
                                for (Object o : del) delList.add(String.valueOf(o));
                                s.setDeliverables(delList);
                            }

                            if (map.get("packages") != null) {
                                s.setPackagesJson(objectMapper.writeValueAsString(map.get("packages")));
                            }

                            serviceRepository.save(s);
                        }
                        log.info("Seeded {} creative services successfully.", list.size());
                    }
                }
            } catch (Exception e) {
                log.error("Failed to seed services: {}", e.getMessage(), e);
            }
        }
    }

    private void seedPricingCategories() {
        if (pricingCategoryRepository.count() == 0) {
            log.info("Seeding pricing structures from pricingData.json...");
            try {
                ClassPathResource resource = new ClassPathResource("data/pricingData.json");
                if (resource.exists()) {
                    try (InputStream is = resource.getInputStream()) {
                        List<Map<String, Object>> list = objectMapper.readValue(is, new TypeReference<>() {});
                        int order = 0;
                        for (Map<String, Object> map : list) {
                            PricingCategory cat = new PricingCategory();
                            cat.setId((String) map.get("id"));
                            cat.setServiceTitle((String) map.get("serviceTitle"));
                            cat.setServiceSlug((String) map.get("serviceSlug"));
                            cat.setStartingPrice((String) map.get("startingPrice"));
                            cat.setPricingNote((String) map.get("pricingNote"));
                            cat.setDisplayOrder(order++);

                            if (map.get("packages") != null) {
                                cat.setPackagesJson(objectMapper.writeValueAsString(map.get("packages")));
                            }
                            if (map.get("additionalCharges") != null) {
                                cat.setAdditionalChargesJson(objectMapper.writeValueAsString(map.get("additionalCharges")));
                            }

                            pricingCategoryRepository.save(cat);
                        }
                        log.info("Seeded {} pricing tiers successfully.", list.size());
                    }
                }
            } catch (Exception e) {
                log.error("Failed to seed pricing categories: {}", e.getMessage(), e);
            }
        }
    }

    private void seedProjects() {
        if (projectRepository.count() == 0) {
            log.info("Seeding portfolio projects from projectsData.json...");
            try {
                ClassPathResource resource = new ClassPathResource("data/projectsData.json");
                if (resource.exists()) {
                    try (InputStream is = resource.getInputStream()) {
                        JsonNode root = objectMapper.readTree(is);
                        if (root.isArray()) {
                            int order = 0;
                            List<Project> projectsToSave = new ArrayList<>();
                            for (JsonNode item : root) {
                                int page = item.has("page") ? item.get("page").asInt() : (order + 1);
                                String id = String.format("proj-%02d", page);
                                String filename = item.has("filename") ? item.get("filename").asText() : "";
                                String imgPath = "/portfolio/" + filename;

                                Project p = new Project();
                                p.setId(id);
                                p.setTitle(item.has("title") ? item.get("title").asText() : "Untitled Design");
                                p.setCategory(item.has("category") ? item.get("category").asText() : "Event & Promotional Posters");
                                p.setClient(item.has("client") ? item.get("client").asText() : "JAIXO STUDIO");
                                p.setYear(item.has("year") ? item.get("year").asText() : "2025");
                                p.setProjectDate(p.getYear());
                                p.setDesignType(item.has("designType") ? item.get("designType").asText() : "Visual Design");
                                p.setDescription(item.has("description") ? item.get("description").asText() : "");
                                p.setPreviewImage(imgPath);
                                p.setFullImage(imgPath);
                                p.setFeatured(item.has("featured") && item.get("featured").asBoolean());
                                p.setIsReplaceablePlaceholder(false);
                                p.setDisplayOrder(order++);

                                List<String> deliverables = new ArrayList<>();
                                if (item.has("deliverables") && item.get("deliverables").isArray()) {
                                    for (JsonNode d : item.get("deliverables")) deliverables.add(d.asText());
                                }
                                p.setDeliverables(deliverables);

                                List<String> tools = new ArrayList<>();
                                if (item.has("toolsUsed") && item.get("toolsUsed").isArray()) {
                                    for (JsonNode t : item.get("toolsUsed")) tools.add(t.asText());
                                }
                                p.setToolsUsed(tools);

                                projectsToSave.add(p);
                            }
                            projectRepository.saveAll(projectsToSave);
                            log.info("Seeded {} genuine portfolio designs into MySQL.", projectsToSave.size());
                        }
                    }
                }
            } catch (Exception e) {
                log.error("Failed to seed portfolio projects: {}", e.getMessage(), e);
            }
        }
    }

    private void seedSampleEnquiries() {
        if (contactEnquiryRepository.count() == 0) {
            ContactEnquiry enq = new ContactEnquiry();
            enq.setId("enq-initial-01");
            enq.setName("Demo Client");
            enq.setEmail("client@example.com");
            enq.setPhone("+91 95663 08652");
            enq.setService("Website Design & Development");
            enq.setBudget("₹25,000 - ₹50,000");
            enq.setDescription("Looking for a clean editorial portfolio website for our design practice.");
            enq.setStatus("New");
            enq.setCreatedAt(LocalDateTime.now());
            contactEnquiryRepository.save(enq);
            log.info("Seeded initial demo inquiry.");
        }
    }
}
