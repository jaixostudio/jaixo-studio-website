package com.jaixostudio.backend.service;

import com.jaixostudio.backend.dto.FileUploadResponse;
import com.jaixostudio.backend.exception.BadRequestException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

/**
 * Service managing physical file uploads, image formats validation, and path resolution.
 */
@Service
public class FileStorageService {

    private final Path uploadStorageLocation;
    private static final List<String> ALLOWED_IMAGE_TYPES = Arrays.asList(
            "image/jpeg", "image/png", "image/webp", "image/svg+xml", "image/gif"
    );

    public FileStorageService(@Value("${app.upload.dir:uploads}") String uploadDir) {
        this.uploadStorageLocation = Paths.get(uploadDir).toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.uploadStorageLocation);
        } catch (Exception ex) {
            throw new RuntimeException("Could not create the upload directory at: " + this.uploadStorageLocation, ex);
        }
    }

    public FileUploadResponse storeFile(MultipartFile file) {
        if (file.isEmpty()) {
            throw new BadRequestException("Uploaded file is empty.");
        }

        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_IMAGE_TYPES.contains(contentType.toLowerCase())) {
            throw new BadRequestException("Invalid file type. Only JPEG, PNG, WEBP, and SVG images are accepted.");
        }

        String originalFilename = StringUtils.cleanPath(file.getOriginalFilename() != null ? file.getOriginalFilename() : "upload");
        String extension = "";
        int dotIndex = originalFilename.lastIndexOf('.');
        if (dotIndex >= 0) {
            extension = originalFilename.substring(dotIndex);
        }

        String safeFileName = UUID.randomUUID().toString().substring(0, 12) + "-" + 
                originalFilename.replaceAll("[^a-zA-Z0-9.-]", "_");

        try {
            Path targetLocation = this.uploadStorageLocation.resolve(safeFileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            String publicUrl = "/uploads/" + safeFileName;
            return new FileUploadResponse(publicUrl, safeFileName, contentType, file.getSize());
        } catch (IOException ex) {
            throw new RuntimeException("Could not store file " + safeFileName + ". Please try again!", ex);
        }
    }
}
