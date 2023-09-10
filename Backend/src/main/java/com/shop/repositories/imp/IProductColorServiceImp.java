package com.shop.repositories.imp;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shop.entities.ProductColor;
import com.shop.repositories.irepo.IProductColorService;
import com.shop.repositories.repo.ProductColorRepository;

@Service
public class IProductColorServiceImp implements IProductColorService {

	@Autowired
	private ProductColorRepository productRepo;

	@Override
	public Iterable<ProductColor> findAll() {
		return productRepo.findAll();
	}

	@Override
	public Optional<ProductColor> findById(Integer id) {
		return productRepo.findById(id);
	}

	@Override
	public ProductColor save(ProductColor t) {
		return productRepo.save(t);
	}

	@Override
	public void remove(Integer id) {
		productRepo.deleteById(id);
	}

}
