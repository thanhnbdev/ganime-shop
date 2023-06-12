package com.example.datn_canh.reponsitory;

import com.example.datn_canh.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Integer> {
}