package com.example.datn_canh.reponsitory;

import com.example.datn_canh.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {
}