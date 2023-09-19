package com.shop.repositories.imp;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shop.entities.Product;
import com.shop.repositories.irepo.IProductService;
import com.shop.repositories.repo.ProductRepository;

@Service
public class IProductServiceImp implements IProductService {

	@Autowired
	private ProductRepository productRepo;

	@Override
	public Iterable<Product> findAll() {
		return productRepo.findAll();
	}

	@Override
	public Optional<Product> findById(Integer id) {
		return productRepo.findById(id);
	}

	@Override
	public Product save(Product t) {
		return productRepo.save(t);
	}

	@Override
	public void remove(Integer id) {
		productRepo.deleteById(id);
	}

}
