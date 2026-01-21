package com.example.spm.domain.dto;

import com.example.spm.domain.entity.Product;
import com.example.spm.domain.enums.ProductStatus;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 상품 관련 DTO
 */
public class ProdDto {

    /**
     * 상품 생성/수정 요청 DTO
     */
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Request {
        @NotBlank(message = "상품코드는 필수입니다")
        String productCode;
        
        @NotBlank(message = "상품명은 필수입니다")
        String productName;
        
        String description;
        Long categoryId;
        ProductStatus status;
    }

    /**
     * 상품 응답 DTO
     */
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {
        Long productId;
        String productCode;
        String productName;
        String description;
        Long categoryId;
        String categoryName;
        ProductStatus status;
        
        /**
         * Entity를 Response DTO로 변환
         */
        public static Response from(Product product) {
            return Response.builder()
                    .productId(product.getProductId())
                    .productCode(product.getProductCode())
                    .productName(product.getProductName())
                    .description(product.getDescription())
                    .categoryId(product.getCategory() != null ? product.getCategory().getCategoryId() : null)
                    .categoryName(product.getCategory() != null ? product.getCategory().getCategoryName() : null)
                    .status(product.getStatus())
                    .build();
        }
    }
}
