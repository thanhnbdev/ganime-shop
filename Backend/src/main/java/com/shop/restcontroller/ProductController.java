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

import com.shop.dto.ProductDto;
import com.shop.entities.Product;
import com.shop.entities.ProductSize;
import com.shop.repositories.irepo.IProductService;
import com.shop.repositories.repo.ProductSizeRepository;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/product")
public class ProductController {

	@Autowired
	IProductService repository;
	@Autowired
	ProductSizeRepository psRepo;

	// getAll
	@GetMapping
	public ResponseEntity<Iterable<Product>> getAllProduct() {
		return new ResponseEntity<>(repository.findAll(), HttpStatus.OK);
	}

	// add new
	@PostMapping
	public ResponseEntity<Product> createNewProduct(@RequestBody ProductDto product) {
		Product p = product.getProduct();
		ProductSize ps = new ProductSize();
		repository.save(p);
		ps.setProduct(p);
		ps.setSize(product.getSize());
		psRepo.save(ps);
		return new ResponseEntity<>(repository.save(p), HttpStatus.OK);
	}

	// getById
	@GetMapping("/{id}")
	public ResponseEntity<Product> getProduct(@PathVariable Integer id) {
		Optional<Product> productOptional = repository.findById(id);
		return productOptional.map(product -> new ResponseEntity<>(product, HttpStatus.OK))
				.orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	// update
	@PutMapping("/{id}")
	public ResponseEntity<Product> updateProduct(@PathVariable Integer id, @RequestBody Product product) {
		Optional<Product> productOptional = repository.findById(id);
		return productOptional.map(u -> {
			product.setId(u.getId());
			return new ResponseEntity<>(repository.save(product), HttpStatus.OK);
		}).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	// delete
	@DeleteMapping("/{id}")
	public ResponseEntity<Product> deleteProduct(@PathVariable Integer id) {
		Optional<Product> productOptional = repository.findById(id);
		return productOptional.map(u -> {
			repository.remove(id);
			return new ResponseEntity<>(u, HttpStatus.OK);
		}).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

}
