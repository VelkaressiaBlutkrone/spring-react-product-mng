package com.example.spm.domain.repository;

import static com.example.spm.domain.entity.QCategory.category;
import static com.example.spm.domain.entity.QProduct.product;

import java.util.List;

import com.example.spm.domain.dto.ProdDto;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

public class ProductRepositoryImpl implements ProductCustomRepository {

    private JPAQueryFactory queryFactory;

    List<ProdDto.Response> findAllProduct() {
        return queryFactory.select(Projections.constructor(ProdDto.Response.class, product, category))
                .from(product)
                .leftJoin(product.category, category).fetchJoin()
                .fetch();
    }
}
