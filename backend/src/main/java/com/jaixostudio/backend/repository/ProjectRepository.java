package com.jaixostudio.backend.repository;

import com.jaixostudio.backend.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, String> {
    List<Project> findAllByOrderByDisplayOrderAsc();
    List<Project> findByCategoryOrderByDisplayOrderAsc(String category);
    List<Project> findByFeaturedTrueOrderByDisplayOrderAsc();

    @Query("SELECT COALESCE(MAX(p.displayOrder), 0) FROM Project p")
    Integer findMaxDisplayOrder();

    @Query("SELECT p FROM Project p WHERE LOWER(p.title) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(p.client) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(p.description) LIKE LOWER(CONCAT('%', :query, '%')) ORDER BY p.displayOrder ASC")
    List<Project> searchProjects(String query);
}
