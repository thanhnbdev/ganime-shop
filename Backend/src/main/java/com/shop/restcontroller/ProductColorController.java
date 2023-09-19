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

import com.shop.entities.ProductColor;
import com.shop.repositories.imp.IProductColorServiceImp;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/product-color")
public class ProductColorController {

	@Autowired
	IProductColorServiceImp repository;

	// getAll
	@GetMapping
	public ResponseEntity<Iterable<ProductColor>> getAllProductColor() {
		return new ResponseEntity<>(repository.findAll(), HttpStatus.OK);
	}

	// add new
	@PostMapping
	public ResponseEntity<ProductColor> createNewProductColor(@RequestBody ProductColor ProductColor) {
		return new ResponseEntity<>(repository.save(ProductColor), HttpStatus.OK);
	}

	// getById
	@GetMapping("/{id}")
	public ResponseEntity<ProductColor> getProductColor(@PathVariable Integer id) {
		Optional<ProductColor> ProductColorOptional = repository.findById(id);
		return ProductColorOptional.map(ProductColor -> new ResponseEntity<>(ProductColor, HttpStatus.OK))
				.orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	// update
	@PutMapping("/{id}")
	public ResponseEntity<ProductColor> updateProductColor(@PathVariable Integer id, @RequestBody ProductColor ProductColor) {
		Optional<ProductColor> ProductColorOptional = repository.findById(id);
		return ProductColorOptional.map(u -> {
			ProductColor.setId(u.getId());
			return new ResponseEntity<>(repository.save(ProductColor), HttpStatus.OK);
		}).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	// delete
	@DeleteMapping("/{id}")
	public ResponseEntity<ProductColor> deleteProductColor(@PathVariable Integer id) {
		Optional<ProductColor> ProductColorOptional = repository.findById(id);
		return ProductColorOptional.map(u -> {
			repository.remove(id);
			return new ResponseEntity<>(u, HttpStatus.OK);
		}).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

}
