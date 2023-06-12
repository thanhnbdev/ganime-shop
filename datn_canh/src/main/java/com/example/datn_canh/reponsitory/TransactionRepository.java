package com.example.datn_canh.reponsitory;

import com.example.datn_canh.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction, Integer> {
}