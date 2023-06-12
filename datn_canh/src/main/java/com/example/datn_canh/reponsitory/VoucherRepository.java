package com.example.datn_canh.reponsitory;

import com.example.datn_canh.entity.Voucher;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VoucherRepository extends JpaRepository<Voucher, Integer> {
}