package com.jaixostudio.backend.repository;

import com.jaixostudio.backend.entity.PricingCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PricingCategoryRepository extends JpaRepository<PricingCategory, String> {
    List<PricingCategory> findAllByOrderByDisplayOrderAsc();
    Optional<PricingCategory> findByServiceSlug(String serviceSlug);
}
