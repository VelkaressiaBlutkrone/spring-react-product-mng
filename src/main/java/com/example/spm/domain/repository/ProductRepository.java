package com.example.spm.domain.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.spm.domain.entity.Product;

/**
 * 상품 Repository
 */
public interface ProductRepository extends JpaRepository<Product, Long>, ProductCustomRepository {
    
    /**
     * 상품코드로 상품 조회
     */
    Optional<Product> findByProductCode(String productCode);
    
    /**
     * 상품코드 존재 여부 확인
     */
    boolean existsByProductCode(String productCode);
}
