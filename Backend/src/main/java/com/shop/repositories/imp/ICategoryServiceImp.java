package com.shop.repositories.imp;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shop.entities.Category;
import com.shop.repositories.irepo.ICategoryService;
import com.shop.repositories.repo.CategoryRepository;

@Service
public class ICategoryServiceImp implements ICategoryService {

	@Autowired
	private CategoryRepository cateRepo;

	@Override
	public Iterable<Category> findAll() {
		return cateRepo.findAll();
	}

	@Override
	public Optional<Category> findById(Integer id) {
		return cateRepo.findById(id);
	}

	@Override
	public Category save(Category c) {
		return cateRepo.save(c);
	}

	@Override
	public void remove(Integer id) {
		cateRepo.deleteById(id);
	}

}
