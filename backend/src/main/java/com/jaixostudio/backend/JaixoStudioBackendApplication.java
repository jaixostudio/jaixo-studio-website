package com.jaixostudio.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main entry point for the JAIXO STUDIO Spring Boot Backend Application.
 * Bootstraps the enterprise Java backend, auto-configures Spring Web,
 * Spring Data JPA, and Spring Security.
 */
@SpringBootApplication
public class JaixoStudioBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(JaixoStudioBackendApplication.class, args);
    }
}
