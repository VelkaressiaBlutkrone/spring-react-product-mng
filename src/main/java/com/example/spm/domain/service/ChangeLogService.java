package com.example.spm.domain.service;

import java.time.LocalDateTime;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.spm.domain.dto.ChangeLogDto;
import com.example.spm.domain.entity.Product;
import com.example.spm.domain.entity.ProductChangeLog;
import com.example.spm.domain.enums.ChangeType;
import com.example.spm.domain.enums.ProductStatus;
import com.example.spm.domain.repository.ProductChangeLogRepository;
import com.example.spm.domain.repository.ProductRepository;
import com.example.spm.exception.BusinessException;
import com.example.spm.exception.ErrorCode;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 변경 이력 서비스 - 상품 변경 이력 관리
 */
@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ChangeLogService {

    private final ProductChangeLogRepository changeLogRepository;
    private final ProductRepository productRepository;

    /**
     * 변경 이력 저장
     */
    @Transactional
    public void saveChangeLog(Product product, ChangeType changeType, String changedField,
                             String oldValue, String newValue, String changedBy) {
        log.debug("변경 이력 저장 - productId: {}, changeType: {}, changedField: {}", 
                product.getProductId(), changeType, changedField);

        ProductChangeLog changeLog = ProductChangeLog.builder()
                .product(product)
                .changeType(changeType)
                .changedField(changedField)
                .oldValue(oldValue)
                .newValue(newValue)
                .changedBy(changedBy != null ? changedBy : "SYSTEM")
                .changedDate(LocalDateTime.now())
                .build();

        changeLogRepository.save(changeLog);
    }

    /**
     * 상품 생성 시 변경 이력 저장
     */
    @Transactional
    public void saveCreateLog(Product product, String changedBy) {
        saveChangeLog(product, ChangeType.CREATE, null, null, 
                     "상품 생성", changedBy);
    }

    /**
     * 상품 수정 시 변경 이력 저장 (필드별 비교)
     * 수정 전 상품 정보는 DB에서 조회한 Product 객체를 사용
     */
    @Transactional
    public void saveUpdateLog(Product product, String oldProductName, String oldDescription,
                             String oldCategoryName, ProductStatus oldStatus, String changedBy) {
        // 상품명 변경
        if (oldProductName != null && !oldProductName.equals(product.getProductName())) {
            saveChangeLog(product, ChangeType.UPDATE, "productName",
                         oldProductName, product.getProductName(), changedBy);
        }

        // 설명 변경
        String oldDesc = oldDescription != null ? oldDescription : "";
        String newDesc = product.getDescription() != null ? product.getDescription() : "";
        if (!oldDesc.equals(newDesc)) {
            saveChangeLog(product, ChangeType.UPDATE, "description", oldDesc, newDesc, changedBy);
        }

        // 카테고리 변경
        String newCatName = product.getCategory() != null ? product.getCategory().getCategoryName() : null;
        if ((oldCategoryName == null && newCatName != null) ||
            (oldCategoryName != null && !oldCategoryName.equals(newCatName))) {
            saveChangeLog(product, ChangeType.UPDATE, "categoryId",
                         oldCategoryName != null ? oldCategoryName : "null",
                         newCatName != null ? newCatName : "null", changedBy);
        }

        // 상태 변경
        if (oldStatus != null && oldStatus != product.getStatus()) {
            saveChangeLog(product, ChangeType.UPDATE, "status",
                         oldStatus.name(), product.getStatus().name(), changedBy);
        }
    }

    /**
     * 상품 삭제 시 변경 이력 저장
     */
    @Transactional
    public void saveDeleteLog(Product product, String changedBy) {
        saveChangeLog(product, ChangeType.DELETE, null, 
                     "상품 삭제", null, changedBy);
    }

    /**
     * 변경 이력 목록 조회
     */
    public Page<ChangeLogDto.Response> getChangeLogs(ChangeLogDto.SearchCondition condition, Pageable pageable) {
        log.info("변경 이력 조회 - productId: {}, changeType: {}, startDate: {}, endDate: {}", 
                condition.getProductId(), condition.getChangeType(), 
                condition.getStartDate(), condition.getEndDate());

        Page<ProductChangeLog> changeLogs;

        if (condition.getProductId() != null && condition.getStartDate() != null && condition.getEndDate() != null) {
            // 상품 및 기간별 조회
            Product product = productRepository.findById(condition.getProductId())
                    .orElseThrow(() -> new BusinessException(ErrorCode.PRODUCT_NOT_FOUND));
            changeLogs = changeLogRepository.findByProductAndChangedDateBetween(
                    product, condition.getStartDate(), condition.getEndDate(), pageable);
        } else if (condition.getProductId() != null) {
            // 상품별 조회
            Product product = productRepository.findById(condition.getProductId())
                    .orElseThrow(() -> new BusinessException(ErrorCode.PRODUCT_NOT_FOUND));
            changeLogs = changeLogRepository.findByProductOrderByChangedDateDesc(product, pageable);
        } else if (condition.getChangeType() != null) {
            // 변경 타입별 조회
            changeLogs = changeLogRepository.findByChangeTypeOrderByChangedDateDesc(condition.getChangeType(), pageable);
        } else if (condition.getStartDate() != null && condition.getEndDate() != null) {
            // 기간별 조회
            changeLogs = changeLogRepository.findByChangedDateBetween(
                    condition.getStartDate(), condition.getEndDate(), pageable);
        } else {
            // 전체 조회
            changeLogs = changeLogRepository.findAll(pageable);
        }

        return changeLogs.map(ChangeLogDto.Response::from);
    }

    /**
     * 최근 변경 이력 조회
     */
    public Page<ChangeLogDto.Response> getRecentChangeLogs(LocalDateTime startDate, Pageable pageable) {
        log.info("최근 변경 이력 조회 - startDate: {}", startDate);
        return changeLogRepository.findByChangedDateGreaterThanEqualOrderByChangedDateDesc(startDate, pageable)
                .map(ChangeLogDto.Response::from);
    }
}
