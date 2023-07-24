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

import com.shop.entities.Size;
import com.shop.repositories.irepo.ISizeService;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/size")
public class SizeController {

	@Autowired
	ISizeService repository;

	// getAll
	@GetMapping
	public ResponseEntity<Iterable<Size>> getAllSize() {
		return new ResponseEntity<>(repository.findAll(), HttpStatus.OK);
	}

	// add new
	@PostMapping
	public ResponseEntity<Size> createNewSize(@RequestBody Size size) {
		return new ResponseEntity<>(repository.save(size), HttpStatus.OK);
	}

	// getById
	@GetMapping("/{id}")
	public ResponseEntity<Size> getSize(@PathVariable Integer id) {
		Optional<Size> sizeOptional = repository.findById(id);
		return sizeOptional.map(size -> new ResponseEntity<>(size, HttpStatus.OK))
				.orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	// update
	@PutMapping("/{id}")
	public ResponseEntity<Size> updateSize(@PathVariable Integer id, @RequestBody Size size) {
		Optional<Size> sizeOptional = repository.findById(id);
		return sizeOptional.map(u -> {
			size.setId(u.getId());
			return new ResponseEntity<>(repository.save(size), HttpStatus.OK);
		}).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	// delete
	@DeleteMapping("/{id}")
	public ResponseEntity<Size> deleteSize(@PathVariable Integer id) {
		Optional<Size> sizeOptional = repository.findById(id);
		return sizeOptional.map(u -> {
			repository.remove(id);
			return new ResponseEntity<>(u, HttpStatus.OK);
		}).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

}
