package com.jaixostudio.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

/**
 * Spring Security 6 Configuration.
 * Configures stateless JWT authentication, CORS policies, password hashing,
 * and endpoint permission rules.
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                // Allow CORS pre-flight requests
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                // Public Static Assets
                .requestMatchers("/uploads/**").permitAll()

                // Public Authentication Endpoints
                .requestMatchers("/api/auth/login").permitAll()

                // Public Read APIs for Frontend Visitors
                .requestMatchers(HttpMethod.GET, "/api/projects/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/services/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/pricing/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/config/**").permitAll()

                // Public Contact Submission for Prospective Clients
                .requestMatchers(HttpMethod.POST, "/api/enquiries").permitAll()

                // Protected Endpoints (Admin required)
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.POST, "/api/projects/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/projects/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/projects/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/services/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/pricing/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/config/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET, "/api/enquiries/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/enquiries/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/enquiries/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.POST, "/api/uploads/**").hasRole("ADMIN")
                .requestMatchers("/api/auth/verify").hasRole("ADMIN")

                // Any other API request requires authentication
                .anyRequest().authenticated()
            );

        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // Allow common local development origins and any port
        configuration.setAllowedOriginPatterns(List.of("http://localhost:*", "http://127.0.0.1:*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "X-Requested-With", "Accept", "Origin"));
        configuration.setExposedHeaders(List.of("Authorization"));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
