package com.shop.repositories.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shop.entities.Size;

@Repository
public interface SizeRepository extends JpaRepository<Size, Integer>{

}
