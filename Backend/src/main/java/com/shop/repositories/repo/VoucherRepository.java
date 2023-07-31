package com.shop.repositories.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shop.entities.Vouchers;

@Repository
public interface VoucherRepository extends JpaRepository<Vouchers, Integer>{

}
