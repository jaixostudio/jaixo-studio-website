package com.jaixostudio.backend.repository;

import com.jaixostudio.backend.entity.ServiceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ServiceRepository extends JpaRepository<ServiceEntity, String> {
    List<ServiceEntity> findAllByOrderByDisplayOrderAsc();
    Optional<ServiceEntity> findBySlug(String slug);
}
