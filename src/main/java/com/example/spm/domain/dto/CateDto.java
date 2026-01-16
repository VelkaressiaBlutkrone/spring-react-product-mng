package com.example.spm.domain.dto;

import com.example.spm.domain.entity.Category;

import lombok.Builder;
import lombok.Data;

public class CateDto {

    @Data
    @Builder
    static class Request {
        Category parentCategory;
        String categoryName;
    }

    @Data
    @Builder
    static class Response {
        Long categoryId;
        String categoryName;
        Long parentId;
        Integer depth;
        Integer sortOrder;
    }
}
