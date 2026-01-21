package com.example.spm.domain.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.spm.domain.dto.ProdDto;
import com.example.spm.domain.service.ProdService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 상품 컨트롤러 - 상품 관련 API 엔드포인트
 */
@Slf4j
@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@Validated
public class ProductController {

    private final ProdService prodService;

    /**
     * 상품 목록 조회
     * GET /api/products?page=0&size=10&productName=노트북&productCode=PROD001&minPrice=1000&maxPrice=10000
     */
    @GetMapping
    public ResponseEntity<Page<ProdDto.Response>> getProducts(
            @RequestParam(required = false) String productName,
            @RequestParam(required = false) String productCode,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Pageable pageable = PageRequest.of(page, size);
        Page<ProdDto.Response> products = prodService.getProducts(
                productName, productCode, minPrice, maxPrice, pageable);
        
        return ResponseEntity.ok(products);
    }

    /**
     * 상품 상세 조회
     * GET /api/products/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<ProdDto.Response> getProduct(@PathVariable Long id) {
        ProdDto.Response product = prodService.getProduct(id);
        return ResponseEntity.ok(product);
    }

    /**
     * 상품 추가
     * POST /api/products
     */
    @PostMapping
    public ResponseEntity<ProdDto.Response> createProduct(@Valid @RequestBody ProdDto.Request request) {
        ProdDto.Response product = prodService.createProduct(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(product);
    }

    /**
     * 상품 수정
     * PUT /api/products/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<ProdDto.Response> updateProduct(
            @PathVariable Long id,
            @Valid @RequestBody ProdDto.Request request) {
        ProdDto.Response product = prodService.updateProduct(id, request);
        return ResponseEntity.ok(product);
    }

    /**
     * 상품 삭제
     * DELETE /api/products/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        prodService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}
