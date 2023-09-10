package com.shop.repositories.imp;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shop.entities.ProductSize;
import com.shop.repositories.irepo.IProductSizeService;
import com.shop.repositories.repo.ProductSizeRepository;

@Service
public class IProductSizeServiceImp implements IProductSizeService {

	@Autowired
	private ProductSizeRepository productRepo;

	@Override
	public Iterable<ProductSize> findAll() {
		return productRepo.findAll();
	}

	@Override
	public Optional<ProductSize> findById(Integer id) {
		return productRepo.findById(id);
	}

	@Override
	public ProductSize save(ProductSize t) {
		return productRepo.save(t);
	}

	@Override
	public void remove(Integer id) {
		productRepo.deleteById(id);
	}

}
