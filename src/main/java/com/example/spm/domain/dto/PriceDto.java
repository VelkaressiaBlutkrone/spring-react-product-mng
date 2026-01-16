package com.example.spm.domain.dto;

import java.time.LocalDateTime;

import com.example.spm.domain.entity.Product;

import lombok.Builder;
import lombok.Data;

public class PriceDto {

    @Data
    @Builder
    static class Request {
        Product product;
        Double price;
        LocalDateTime startDate;
        LocalDateTime endDate;
    }

    @Data
    @Builder
    static class Response {
        Long priceId;
        Long productId;
        String productName;
        Double price;
        LocalDateTime startDate;
        LocalDateTime endDate;
    }
}
