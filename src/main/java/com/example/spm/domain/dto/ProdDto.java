package com.example.spm.domain.dto;

import com.example.spm.domain.entity.Category;
import com.example.spm.domain.enums.ProductStatus;

import lombok.Builder;
import lombok.Data;

public class ProdDto {

    @Data
    @Builder
    public static class Request {
        String productCode;
        String productName;
        Category category;
        ProductStatus status;
    }

    @Data
    @Builder
    public static class Response {
        Long productId;
        String productCode;
        String productName;
        String description;
        Long categoryId;
        String categoryName;
        ProductStatus status;
    }
}
