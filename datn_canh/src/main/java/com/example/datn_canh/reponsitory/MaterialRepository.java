package com.example.datn_canh.reponsitory;

import com.example.datn_canh.entity.Material;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MaterialRepository extends JpaRepository<Material, Integer> {
}