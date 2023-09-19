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

import com.shop.entities.Color;
import com.shop.repositories.irepo.IColorService;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/color")
public class ColorController {

	@Autowired
	IColorService repository;

	// getAll
	@GetMapping
	public ResponseEntity<Iterable<Color>> getAllColor() {
		return new ResponseEntity<>(repository.findAll(), HttpStatus.OK);
	}

	// add new
	@PostMapping
	public ResponseEntity<Color> createNewColor(@RequestBody Color Color) {
		return new ResponseEntity<>(repository.save(Color), HttpStatus.OK);
	}

	// getById
	@GetMapping("/{id}")
	public ResponseEntity<Color> getColor(@PathVariable Integer id) {
		Optional<Color> colorOptional = repository.findById(id);
		return colorOptional.map(color -> new ResponseEntity<>(color, HttpStatus.OK))
				.orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	// update
	@PutMapping("/{id}")
	public ResponseEntity<Color> updateColor(@PathVariable Integer id, @RequestBody Color color) {
		Optional<Color> colorOptional = repository.findById(id);
		return colorOptional.map(u -> {
			color.setId(u.getId());
			return new ResponseEntity<>(repository.save(color), HttpStatus.OK);
		}).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	// delete
	@DeleteMapping("/{id}")
	public ResponseEntity<Color> deleteColor(@PathVariable Integer id) {
		Optional<Color> colorOptional = repository.findById(id);
		return colorOptional.map(u -> {
			repository.remove(id);
			return new ResponseEntity<>(u, HttpStatus.OK);
		}).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

}
