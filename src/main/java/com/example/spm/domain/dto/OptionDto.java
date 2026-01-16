package com.example.spm.domain.dto;

import com.example.spm.domain.entity.Product;

import lombok.Builder;
import lombok.Data;

public class OptionDto {

    @Data
    @Builder
    static class Request {
        Product product;
        String optionName;
        String optionValue;
    }

    @Data
    @Builder
    static class Response {
        Long optionId;
        Long productId;
        String productName;
        String optionName;
        String optionValue;
    }
}
