package com.jaixostudio.backend.controller;

import com.jaixostudio.backend.dto.ApiResponse;
import com.jaixostudio.backend.dto.AuthResponse;
import com.jaixostudio.backend.dto.LoginRequest;
import com.jaixostudio.backend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controller handling Admin authentication and JWT token verification.
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(ApiResponse.ok("Login successful", response));
    }

    @GetMapping("/verify")
    public ResponseEntity<ApiResponse<Boolean>> verifyToken(
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        boolean valid = authService.verifyToken(authHeader);
        return ResponseEntity.ok(ApiResponse.ok("Token verification status", valid));
    }
}
