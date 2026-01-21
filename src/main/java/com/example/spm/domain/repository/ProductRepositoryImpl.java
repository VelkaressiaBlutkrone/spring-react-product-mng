package com.example.spm.domain.repository;

import static com.example.spm.domain.entity.QCategory.category;
import static com.example.spm.domain.entity.QPriceHistory.priceHistory;
import static com.example.spm.domain.entity.QProduct.product;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import com.example.spm.domain.dto.ProdDto;
import com.example.spm.domain.entity.Product;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

/**
 * 상품 Custom Repository 구현
 */
@Repository
@RequiredArgsConstructor
public class ProductRepositoryImpl implements ProductCustomRepository {

    private final JPAQueryFactory queryFactory;

    /**
     * 상품 목록 조회 - 검색 조건 및 페이징 처리
     */
    @Override
    public Page<ProdDto.Response> searchProducts(String productName, String productCode, 
                                                   Double minPrice, Double maxPrice, 
                                                   Pageable pageable) {
        // 기본 쿼리 작성
        var query = queryFactory
                .select(product)
                .from(product)
                .leftJoin(product.category, category).fetchJoin()
                .where(
                        productNameContains(productName),
                        productCodeContains(productCode),
                        priceBetween(minPrice, maxPrice)
                )
                .orderBy(createdDateDesc());

        // 전체 개수 조회
        long total = query.fetch().size();

        // 페이징 적용
        List<Product> products = query
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        // Response DTO로 변환
        List<ProdDto.Response> content = products.stream()
                .map(ProdDto.Response::from)
                .toList();

        return new PageImpl<>(content, pageable, total);
    }

    // 상품명 검색 조건
    private BooleanExpression productNameContains(String productName) {
        return productName != null && !productName.isEmpty()
                ? product.productName.containsIgnoreCase(productName)
                : null;
    }

    // 상품코드 검색 조건
    private BooleanExpression productCodeContains(String productCode) {
        return productCode != null && !productCode.isEmpty()
                ? product.productCode.containsIgnoreCase(productCode)
                : null;
    }

    // 가격 범위 검색 조건 - 현재 유효한 가격만 조회
    private BooleanExpression priceBetween(Double minPrice, Double maxPrice) {
        if (minPrice == null && maxPrice == null) {
            return null;
        }

        // 현재 유효한 가격이 있는 상품만 조회 (endDate가 null이거나 미래인 경우)
        var validPriceQuery = queryFactory
                .select(priceHistory.product.productId)
                .from(priceHistory)
                .where(
                        priceHistory.endDate.isNull()
                                .or(priceHistory.endDate.after(LocalDateTime.now())),
                        minPrice != null ? priceHistory.price.goe(minPrice) : null,
                        maxPrice != null ? priceHistory.price.loe(maxPrice) : null
                )
                .groupBy(priceHistory.product.productId);

        return product.productId.in(validPriceQuery);
    }

    // 등록 날짜 기준 내림차순 정렬
    private OrderSpecifier<?> createdDateDesc() {
        return product.createdDate.desc();
    }
}
