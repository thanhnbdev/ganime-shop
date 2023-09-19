package com.shop.repositories.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shop.entities.Orders;

@Repository
public interface OrderRepository extends JpaRepository<Orders, Integer>{

}
