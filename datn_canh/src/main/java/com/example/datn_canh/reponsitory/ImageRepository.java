package com.example.datn_canh.reponsitory;

import com.example.datn_canh.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Integer> {
}