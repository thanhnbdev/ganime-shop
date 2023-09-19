package com.shop.repositories.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shop.entities.ProductSize;

@Repository
public interface ProductSizeRepository extends JpaRepository<ProductSize, Integer>{

}
