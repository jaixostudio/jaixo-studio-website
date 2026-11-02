package com.jaixostudio.backend.controller;

import com.jaixostudio.backend.dto.ApiResponse;
import com.jaixostudio.backend.dto.ProjectDto;
import com.jaixostudio.backend.service.ProjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Controller exposing Portfolio Project endpoints.
 * Public GET methods for showcasing works; Protected methods for Admin CRUD and ordering.
 */
@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ProjectDto>>> getAllProjects(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Boolean featured) {

        List<ProjectDto> projects;
        if (search != null && !search.trim().isEmpty()) {
            projects = projectService.searchProjects(search);
        } else if (Boolean.TRUE.equals(featured)) {
            projects = projectService.getFeaturedProjects();
        } else if (category != null && !category.trim().isEmpty()) {
            projects = projectService.getProjectsByCategory(category);
        } else {
            projects = projectService.getAllProjects();
        }

        return ResponseEntity.ok(ApiResponse.ok("Projects retrieved successfully", projects));
    }

    @GetMapping("/featured")
    public ResponseEntity<ApiResponse<List<ProjectDto>>> getFeaturedProjects() {
        List<ProjectDto> projects = projectService.getFeaturedProjects();
        return ResponseEntity.ok(ApiResponse.ok("Featured projects retrieved successfully", projects));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProjectDto>> getProjectById(@PathVariable String id) {
        ProjectDto project = projectService.getProjectById(id);
        return ResponseEntity.ok(ApiResponse.ok("Project details", project));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ProjectDto>> createProject(@RequestBody ProjectDto dto) {
        ProjectDto created = projectService.createProject(dto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Project created successfully", created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ProjectDto>> updateProject(
            @PathVariable String id,
            @RequestBody ProjectDto dto) {
        ProjectDto updated = projectService.updateProject(id, dto);
        return ResponseEntity.ok(ApiResponse.ok("Project updated successfully", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteProject(@PathVariable String id) {
        projectService.deleteProject(id);
        return ResponseEntity.ok(ApiResponse.ok("Project deleted successfully"));
    }

    @PostMapping("/{id}/move")
    public ResponseEntity<ApiResponse<List<ProjectDto>>> moveProject(
            @PathVariable String id,
            @RequestBody Map<String, String> payload) {
        String direction = payload.getOrDefault("direction", "up");
        List<ProjectDto> updatedList = projectService.moveProject(id, direction);
        return ResponseEntity.ok(ApiResponse.ok("Project reordered successfully", updatedList));
    }

    @PostMapping("/{id}/toggle-featured")
    public ResponseEntity<ApiResponse<ProjectDto>> toggleFeatured(@PathVariable String id) {
        ProjectDto updated = projectService.toggleFeatured(id);
        return ResponseEntity.ok(ApiResponse.ok("Project featured status toggled", updated));
    }
}
