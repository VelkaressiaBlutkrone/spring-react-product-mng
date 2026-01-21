package com.example.spm.domain.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.spm.domain.dto.ProdDto;
import com.example.spm.domain.entity.Category;
import com.example.spm.domain.entity.Product;
import com.example.spm.domain.enums.ProductStatus;
import com.example.spm.domain.repository.CategoryRepository;
import com.example.spm.domain.repository.ProductRepository;
import com.example.spm.exception.BusinessException;
import com.example.spm.exception.ErrorCode;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 상품 서비스 - 상품 관련 비즈니스 로직 처리
 */
@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProdService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    /**
     * 상품 목록 조회 - 검색 조건 및 페이징 처리
     */
    @com.example.spm.global.annotation.Logging(level = com.example.spm.global.annotation.Logging.LogLevel.INFO)
    public Page<ProdDto.Response> getProducts(String productName, String productCode, 
                                                Double minPrice, Double maxPrice, 
                                                Pageable pageable) {
        log.info("상품 목록 조회 - productName: {}, productCode: {}, minPrice: {}, maxPrice: {}, page: {}", 
                productName, productCode, minPrice, maxPrice, pageable.getPageNumber());
        
        return productRepository.searchProducts(productName, productCode, minPrice, maxPrice, pageable);
    }

    /**
     * 상품 상세 조회
     */
    public ProdDto.Response getProduct(Long productId) {
        log.info("상품 상세 조회 - productId: {}", productId);
        
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new BusinessException(ErrorCode.PRODUCT_NOT_FOUND));
        
        return ProdDto.Response.from(product);
    }

    /**
     * 상품 추가
     */
    @Transactional
    @com.example.spm.global.annotation.Logging(level = com.example.spm.global.annotation.Logging.LogLevel.INFO)
    public ProdDto.Response createProduct(ProdDto.Request request) {
        log.info("상품 추가 - productCode: {}, productName: {}", request.getProductCode(), request.getProductName());
        
        // 상품코드 중복 검증
        if (productRepository.existsByProductCode(request.getProductCode())) {
            throw new BusinessException(ErrorCode.PRODUCT_CODE_DUPLICATE);
        }

        // 카테고리 조회
        Category category = null;
        if (request.getCategoryId() != null) {
            category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new BusinessException(ErrorCode.CATEGORY_NOT_FOUND));
        }

        // 상품 생성
        Product product = Product.builder()
                .productCode(request.getProductCode())
                .productName(request.getProductName())
                .description(request.getDescription())
                .category(category)
                .status(request.getStatus() != null ? request.getStatus() : ProductStatus.ACTIVE)
                .build();

        Product savedProduct = productRepository.save(product);
        log.info("상품 추가 완료 - productId: {}", savedProduct.getProductId());
        
        return ProdDto.Response.from(savedProduct);
    }

    /**
     * 상품 수정
     */
    @Transactional
    @com.example.spm.global.annotation.Logging(level = com.example.spm.global.annotation.Logging.LogLevel.INFO)
    public ProdDto.Response updateProduct(Long productId, ProdDto.Request request) {
        log.info("상품 수정 - productId: {}, productName: {}", productId, request.getProductName());
        
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new BusinessException(ErrorCode.PRODUCT_NOT_FOUND));

        // 카테고리 조회
        Category category = null;
        if (request.getCategoryId() != null) {
            category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new BusinessException(ErrorCode.CATEGORY_NOT_FOUND));
        }

        // 상품 정보 수정 (상품코드는 수정 불가)
        product.update(request.getProductName(), request.getDescription(), category, request.getStatus());
        
        log.info("상품 수정 완료 - productId: {}", productId);
        return ProdDto.Response.from(product);
    }

    /**
     * 상품 삭제
     */
    @Transactional
    @com.example.spm.global.annotation.Logging(level = com.example.spm.global.annotation.Logging.LogLevel.INFO)
    public void deleteProduct(Long productId) {
        log.info("상품 삭제 - productId: {}", productId);
        
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new BusinessException(ErrorCode.PRODUCT_NOT_FOUND));

        // 연관 데이터 확인 (재고, 옵션, 가격 이력 등)
        // 현재는 단순 삭제, 필요시 Soft Delete나 Cascade 처리 고려
        
        productRepository.delete(product);
        log.info("상품 삭제 완료 - productId: {}", productId);
    }
}
