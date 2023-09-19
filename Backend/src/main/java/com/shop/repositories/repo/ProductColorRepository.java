package com.shop.repositories.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shop.entities.ProductColor;

@Repository
public interface ProductColorRepository extends JpaRepository<ProductColor, Integer>{

}
