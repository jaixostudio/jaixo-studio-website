package com.jaixostudio.backend.controller;

import com.jaixostudio.backend.dto.ApiResponse;
import com.jaixostudio.backend.dto.FileUploadResponse;
import com.jaixostudio.backend.service.FileStorageService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

/**
 * Controller handling high-resolution image uploads for Portfolio projects and Services.
 */
@RestController
@RequestMapping("/api/uploads")
public class FileUploadController {

    private final FileStorageService fileStorageService;

    public FileUploadController(FileStorageService fileStorageService) {
        this.fileStorageService = fileStorageService;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<FileUploadResponse>> uploadFile(
            @RequestParam("file") MultipartFile file) {
        FileUploadResponse response = fileStorageService.storeFile(file);
        return ResponseEntity.ok(ApiResponse.ok("File uploaded successfully", response));
    }
}
