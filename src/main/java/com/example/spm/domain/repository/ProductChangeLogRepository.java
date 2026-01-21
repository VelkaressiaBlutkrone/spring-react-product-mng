package com.example.spm.domain.repository;

import java.time.LocalDateTime;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.spm.domain.entity.Product;
import com.example.spm.domain.entity.ProductChangeLog;
import com.example.spm.domain.enums.ChangeType;

/**
 * 상품 변경 이력 Repository
 */
public interface ProductChangeLogRepository extends JpaRepository<ProductChangeLog, Long> {

    /**
     * 상품별 변경 이력 조회
     */
    Page<ProductChangeLog> findByProductOrderByChangedDateDesc(Product product, Pageable pageable);

    /**
     * 변경 타입별 조회
     */
    Page<ProductChangeLog> findByChangeTypeOrderByChangedDateDesc(ChangeType changeType, Pageable pageable);

    /**
     * 기간별 변경 이력 조회
     */
    @Query("SELECT pcl FROM ProductChangeLog pcl WHERE pcl.changedDate BETWEEN :startDate AND :endDate ORDER BY pcl.changedDate DESC")
    Page<ProductChangeLog> findByChangedDateBetween(@Param("startDate") LocalDateTime startDate,
                                                    @Param("endDate") LocalDateTime endDate,
                                                    Pageable pageable);

    /**
     * 상품 및 기간별 변경 이력 조회
     */
    @Query("SELECT pcl FROM ProductChangeLog pcl WHERE pcl.product = :product AND pcl.changedDate BETWEEN :startDate AND :endDate ORDER BY pcl.changedDate DESC")
    Page<ProductChangeLog> findByProductAndChangedDateBetween(@Param("product") Product product,
                                                              @Param("startDate") LocalDateTime startDate,
                                                              @Param("endDate") LocalDateTime endDate,
                                                              Pageable pageable);

    /**
     * 최근 변경 이력 조회 (기간 내)
     */
    Page<ProductChangeLog> findByChangedDateGreaterThanEqualOrderByChangedDateDesc(LocalDateTime startDate, Pageable pageable);
}
