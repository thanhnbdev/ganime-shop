package com.example.datn_canh.reponsitory;

import com.example.datn_canh.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Integer> {
}