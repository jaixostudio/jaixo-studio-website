package com.jaixostudio.backend.service;

import com.jaixostudio.backend.dto.ProjectDto;
import com.jaixostudio.backend.entity.Project;
import com.jaixostudio.backend.exception.ResourceNotFoundException;
import com.jaixostudio.backend.repository.ProjectRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * Service managing Portfolio Project showcases, ordering, filtering, and CRUD.
 */
@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Transactional(readOnly = true)
    public List<ProjectDto> getAllProjects() {
        return projectRepository.findAllByOrderByDisplayOrderAsc()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ProjectDto> getProjectsByCategory(String category) {
        if ("All Projects".equalsIgnoreCase(category) || "All".equalsIgnoreCase(category)) {
            return getAllProjects();
        }
        return projectRepository.findByCategoryOrderByDisplayOrderAsc(category)
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ProjectDto> getFeaturedProjects() {
        return projectRepository.findByFeaturedTrueOrderByDisplayOrderAsc()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ProjectDto> searchProjects(String query) {
        if (query == null || query.trim().isEmpty()) {
            return getAllProjects();
        }
        return projectRepository.searchProjects(query.trim())
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ProjectDto getProjectById(String id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + id));
        return toDto(project);
    }

    @Transactional
    public ProjectDto createProject(ProjectDto dto) {
        Project project = new Project();
        String id = dto.getId() != null && !dto.getId().trim().isEmpty() 
                ? dto.getId() 
                : "proj-" + UUID.randomUUID().toString().substring(0, 8);
        project.setId(id);
        
        mapDtoToEntity(dto, project);
        
        // Put new project at the top (order = 0) and shift others down
        Integer maxOrder = projectRepository.findMaxDisplayOrder();
        project.setDisplayOrder(0);

        List<Project> existing = projectRepository.findAllByOrderByDisplayOrderAsc();
        for (int i = 0; i < existing.size(); i++) {
            existing.get(i).setDisplayOrder(i + 1);
        }
        projectRepository.saveAll(existing);

        Project saved = projectRepository.save(project);
        return toDto(saved);
    }

    @Transactional
    public ProjectDto updateProject(String id, ProjectDto dto) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + id));

        mapDtoToEntity(dto, project);
        project.setUpdatedAt(LocalDateTime.now());

        Project saved = projectRepository.save(project);
        return toDto(saved);
    }

    @Transactional
    public void deleteProject(String id) {
        if (!projectRepository.existsById(id)) {
            throw new ResourceNotFoundException("Project not found with id: " + id);
        }
        projectRepository.deleteById(id);
    }

    @Transactional
    public List<ProjectDto> moveProject(String id, String direction) {
        List<Project> projects = projectRepository.findAllByOrderByDisplayOrderAsc();
        int index = -1;
        for (int i = 0; i < projects.size(); i++) {
            if (projects.get(i).getId().equals(id)) {
                index = i;
                break;
            }
        }

        if (index == -1) {
            throw new ResourceNotFoundException("Project not found with id: " + id);
        }

        int targetIndex = "up".equalsIgnoreCase(direction) ? index - 1 : index + 1;
        if (targetIndex >= 0 && targetIndex < projects.size()) {
            Project current = projects.get(index);
            Project target = projects.get(targetIndex);

            int tempOrder = current.getDisplayOrder();
            current.setDisplayOrder(target.getDisplayOrder());
            target.setDisplayOrder(tempOrder);

            projectRepository.save(current);
            projectRepository.save(target);
        }

        return getAllProjects();
    }

    @Transactional
    public ProjectDto toggleFeatured(String id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + id));

        boolean current = Boolean.TRUE.equals(project.getFeatured());
        project.setFeatured(!current);
        project.setUpdatedAt(LocalDateTime.now());

        Project saved = projectRepository.save(project);
        return toDto(saved);
    }

    // Mapping helper methods
    private void mapDtoToEntity(ProjectDto dto, Project project) {
        project.setTitle(dto.getTitle());
        project.setCategory(dto.getCategory());
        project.setClient(dto.getClient());
        project.setYear(dto.getYear());
        project.setDescription(dto.getDescription());
        project.setDesignType(dto.getDesignType());
        project.setChallenge(dto.getChallenge());
        project.setSolution(dto.getSolution());
        project.setDeliverables(dto.getDeliverables());
        project.setToolsUsed(dto.getToolsUsed());
        project.setPreviewImage(dto.getPreviewImage());
        project.setFullImage(dto.getFullImage());
        if (dto.getFeatured() != null) project.setFeatured(dto.getFeatured());
        project.setProjectDate(dto.getProjectDate());
        if (dto.getIsReplaceablePlaceholder() != null) project.setIsReplaceablePlaceholder(dto.getIsReplaceablePlaceholder());
        project.setExternalUrl(dto.getExternalUrl());
        if (dto.getDisplayOrder() != null) project.setDisplayOrder(dto.getDisplayOrder());
    }

    public ProjectDto toDto(Project project) {
        ProjectDto dto = new ProjectDto();
        dto.setId(project.getId());
        dto.setTitle(project.getTitle());
        dto.setCategory(project.getCategory());
        dto.setClient(project.getClient());
        dto.setYear(project.getYear());
        dto.setDescription(project.getDescription());
        dto.setDesignType(project.getDesignType());
        dto.setChallenge(project.getChallenge());
        dto.setSolution(project.getSolution());
        dto.setDeliverables(project.getDeliverables());
        dto.setToolsUsed(project.getToolsUsed());
        dto.setPreviewImage(project.getPreviewImage());
        dto.setFullImage(project.getFullImage());
        dto.setFeatured(project.getFeatured());
        dto.setProjectDate(project.getProjectDate());
        dto.setIsReplaceablePlaceholder(project.getIsReplaceablePlaceholder());
        dto.setExternalUrl(project.getExternalUrl());
        dto.setDisplayOrder(project.getDisplayOrder());
        return dto;
    }
}
