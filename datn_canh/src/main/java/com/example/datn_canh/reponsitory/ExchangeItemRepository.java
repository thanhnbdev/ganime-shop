package com.example.datn_canh.reponsitory;

import com.example.datn_canh.entity.ExchangeItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExchangeItemRepository extends JpaRepository<ExchangeItem, Integer> {
}