package com.shop.repositories.imp;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shop.entities.Contact;
import com.shop.repositories.irepo.IContactService;
import com.shop.repositories.repo.ContactRepository;

@Service
public class IContactServiceImp implements IContactService {

	@Autowired
	private ContactRepository contactRepo;

	@Override
	public Iterable<Contact> findAll() {
		return contactRepo.findAll();
	}

	@Override
	public Optional<Contact> findById(Integer id) {
		return contactRepo.findById(id);
	}

	@Override
	public Contact save(Contact t) {
		return contactRepo.save(t);
	}

	@Override
	public void remove(Integer id) {
		contactRepo.deleteById(id);
	}

}
