package com.jaixostudio.backend.repository;

import com.jaixostudio.backend.entity.SiteConfigEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SiteConfigRepository extends JpaRepository<SiteConfigEntity, Long> {
}
