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

import com.shop.entities.ProductSize;
import com.shop.repositories.imp.IProductSizeServiceImp;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/product-size")
public class ProductSizeController {

	@Autowired
	IProductSizeServiceImp repository;

	// getAll
	@GetMapping
	public ResponseEntity<Iterable<ProductSize>> getAllProductSize() {
		return new ResponseEntity<>(repository.findAll(), HttpStatus.OK);
	}

	// add new
	@PostMapping
	public ResponseEntity<ProductSize> createNewProductSize(@RequestBody ProductSize ProductSize) {
		return new ResponseEntity<>(repository.save(ProductSize), HttpStatus.OK);
	}

	// getById
	@GetMapping("/{id}")
	public ResponseEntity<ProductSize> getProductSize(@PathVariable Integer id) {
		Optional<ProductSize> ProductSizeOptional = repository.findById(id);
		return ProductSizeOptional.map(ProductSize -> new ResponseEntity<>(ProductSize, HttpStatus.OK))
				.orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	// update
	@PutMapping("/{id}")
	public ResponseEntity<ProductSize> updateProductSize(@PathVariable Integer id, @RequestBody ProductSize ProductSize) {
		Optional<ProductSize> ProductSizeOptional = repository.findById(id);
		return ProductSizeOptional.map(u -> {
			ProductSize.setId(u.getId());
			return new ResponseEntity<>(repository.save(ProductSize), HttpStatus.OK);
		}).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	// delete
	@DeleteMapping("/{id}")
	public ResponseEntity<ProductSize> deleteProductSize(@PathVariable Integer id) {
		Optional<ProductSize> ProductSizeOptional = repository.findById(id);
		return ProductSizeOptional.map(u -> {
			repository.remove(id);
			return new ResponseEntity<>(u, HttpStatus.OK);
		}).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

}
