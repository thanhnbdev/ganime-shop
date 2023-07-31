package com.shop.repositories.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shop.entities.Color;

@Repository
public interface ColorRepository extends JpaRepository<Color, Integer>{

}
