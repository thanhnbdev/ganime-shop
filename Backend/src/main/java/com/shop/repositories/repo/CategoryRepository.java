package com.shop.repositories.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shop.entities.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer>{

}
