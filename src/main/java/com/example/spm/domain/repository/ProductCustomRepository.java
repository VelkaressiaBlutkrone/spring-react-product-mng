package com.example.spm.domain.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.spm.domain.dto.ProdDto;

/**
 * 상품 Custom Repository 인터페이스
 */
public interface ProductCustomRepository {
    
    /**
     * 상품 목록 조회 - 검색 조건 및 페이징 처리
     * @param productName 상품명 검색 조건
     * @param productCode 상품코드 검색 조건
     * @param minPrice 최소 가격
     * @param maxPrice 최대 가격
     * @param pageable 페이징 정보
     * @return 페이징된 상품 목록
     */
    Page<ProdDto.Response> searchProducts(String productName, String productCode, 
                                           Double minPrice, Double maxPrice, 
                                           Pageable pageable);
}
