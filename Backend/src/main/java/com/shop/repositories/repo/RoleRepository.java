package com.shop.repositories.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shop.entities.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer>{

}
