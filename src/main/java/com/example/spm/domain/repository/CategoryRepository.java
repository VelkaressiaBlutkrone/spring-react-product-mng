package com.example.spm.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.spm.domain.entity.Category;

/**
 * 카테고리 Repository
 */
public interface CategoryRepository extends JpaRepository<Category, Long> {
}
