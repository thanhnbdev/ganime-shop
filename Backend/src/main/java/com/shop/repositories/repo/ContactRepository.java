package com.shop.repositories.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shop.entities.Contact;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Integer>{

}
