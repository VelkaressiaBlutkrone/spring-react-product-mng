package com.example.spm.domain.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.spm.domain.entity.Category;
import com.example.spm.domain.repository.CategoryRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 카테고리 컨트롤러
 */
@Slf4j
@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryRepository categoryRepository;

    /**
     * 전체 카테고리 목록 조회
     */
    @GetMapping
    public ResponseEntity<List<Category>> getCategories() {
        List<Category> categories = categoryRepository.findAll();
        return ResponseEntity.ok(categories);
    }
}
