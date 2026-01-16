package com.example.spm.domain.dto;

import com.example.spm.domain.entity.Product;

import lombok.Builder;
import lombok.Data;

public class InvenDto {

    @Data
    @Builder
    static class Request {
        Product product;
        Integer quantity;
        String warehouseCode;
    }

    @Data
    @Builder
    static class Response {
        Long inventoryId;
        Long productId;
        String productName;
        Integer quantity;
        String warehouseCode;
    }
}
