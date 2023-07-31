package com.shop.repositories.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shop.entities.Authority;

@Repository
public interface AuthoRepository extends JpaRepository<Authority, Integer>{

}
