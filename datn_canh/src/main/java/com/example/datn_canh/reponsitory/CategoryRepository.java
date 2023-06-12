package com.example.datn_canh.reponsitory;

import com.example.datn_canh.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
}