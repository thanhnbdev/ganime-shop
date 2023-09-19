package com.shop.repositories.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shop.entities.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer>{

}
