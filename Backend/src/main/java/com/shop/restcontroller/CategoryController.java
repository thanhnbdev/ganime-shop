package com.shop.restcontroller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shop.entities.Category;
import com.shop.repositories.irepo.ICategoryService;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/category")
public class CategoryController {

	@Autowired
	ICategoryService repository;

	// getAll
	@GetMapping
	public ResponseEntity<Iterable<Category>> getAllCategory() {
		return new ResponseEntity<>(repository.findAll(), HttpStatus.OK);
	}

	// add new
	@PostMapping
	public ResponseEntity<Category> createNewCategory(@RequestBody Category category) {
		return new ResponseEntity<>(repository.save(category), HttpStatus.OK);
	}

	// getById
	@GetMapping("/{id}")
	public ResponseEntity<Category> getCategory(@PathVariable Integer id) {
		Optional<Category> categoryOptional = repository.findById(id);
		return categoryOptional.map(category -> new ResponseEntity<>(category, HttpStatus.OK))
				.orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	// update
	@PutMapping("/{id}")
	public ResponseEntity<Category> updateCategory(@PathVariable Integer id, @RequestBody Category category) {
		Optional<Category> categoryOptional = repository.findById(id);
		return categoryOptional.map(u -> {
			category.setId(u.getId());
			return new ResponseEntity<>(repository.save(category), HttpStatus.OK);
		}).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	// delete
	@DeleteMapping("/{id}")
	public ResponseEntity<Category> deleteCategory(@PathVariable Integer id) {
		Optional<Category> categoryOptional = repository.findById(id);
		return categoryOptional.map(u -> {
			repository.remove(id);
			return new ResponseEntity<>(u, HttpStatus.OK);
		}).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

}
