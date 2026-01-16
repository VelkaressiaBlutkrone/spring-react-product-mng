package com.example.spm.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.spm.domain.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long>, ProductCustomRepository {

}
