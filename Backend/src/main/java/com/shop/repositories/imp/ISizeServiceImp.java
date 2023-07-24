package com.shop.repositories.imp;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shop.entities.Size;
import com.shop.repositories.irepo.ISizeService;
import com.shop.repositories.repo.SizeRepository;

@Service
public class ISizeServiceImp implements ISizeService {

	@Autowired
	private SizeRepository sizeRepo;

	@Override
	public Iterable<Size> findAll() {
		return sizeRepo.findAll();
	}

	@Override
	public Optional<Size> findById(Integer id) {
		return sizeRepo.findById(id);
	}

	@Override
	public Size save(Size t) {
		return sizeRepo.save(t);
	}

	@Override
	public void remove(Integer id) {
		sizeRepo.deleteById(id);
	}

}
