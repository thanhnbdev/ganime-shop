package com.example.datn_canh.reponsitory;

import com.example.datn_canh.entity.Staff;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StaffRepository extends JpaRepository<Staff, Integer> {
}