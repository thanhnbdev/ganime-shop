package com.example.datn_canh.reponsitory;

import com.example.datn_canh.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Integer> {
}