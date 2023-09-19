package com.shop.repositories.imp;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shop.entities.Authority;
import com.shop.repositories.irepo.IAuthoService;
import com.shop.repositories.repo.AuthoRepository;

@Service
public class IAuthoServiceImp implements IAuthoService {

	@Autowired
	private AuthoRepository authoRepo;

	@Override
	public Iterable<Authority> findAll() {
		return authoRepo.findAll();
	}

	@Override
	public Optional<Authority> findById(Integer id) {
		return authoRepo.findById(id);
	}

	@Override
	public Authority save(Authority t) {
		return authoRepo.save(t);
	}

	@Override
	public void remove(Integer id) {
		authoRepo.deleteById(id);
	}

}
