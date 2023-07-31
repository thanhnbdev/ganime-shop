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

import com.shop.entities.Favourite;
import com.shop.repositories.irepo.IFavouriteService;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/favourite")
public class FavouriteController {

	@Autowired
	IFavouriteService repository;

	// getAll
	@GetMapping
	public ResponseEntity<Iterable<Favourite>> getAllFavourite() {
		return new ResponseEntity<>(repository.findAll(), HttpStatus.OK);
	}

	// add new
	@PostMapping
	public ResponseEntity<Favourite> createNewFavourite(@RequestBody Favourite favourite) {
		return new ResponseEntity<>(repository.save(favourite), HttpStatus.OK);
	}

	// getById
	@GetMapping("/{id}")
	public ResponseEntity<Favourite> getFavourite(@PathVariable Integer id) {
		Optional<Favourite> favouriteOptional = repository.findById(id);
		return favouriteOptional.map(favourite -> new ResponseEntity<>(favourite, HttpStatus.OK))
				.orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	// update
	@PutMapping("/{id}")
	public ResponseEntity<Favourite> updateFavourite(@PathVariable Integer id, @RequestBody Favourite favourite) {
		Optional<Favourite> favouriteOptional = repository.findById(id);
		return favouriteOptional.map(u -> {
			favourite.setId(u.getId());
			return new ResponseEntity<>(repository.save(favourite), HttpStatus.OK);
		}).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	// delete
	@DeleteMapping("/{id}")
	public ResponseEntity<Favourite> deleteFavourite(@PathVariable Integer id) {
		Optional<Favourite> favouriteOptional = repository.findById(id);
		return favouriteOptional.map(u -> {
			repository.remove(id);
			return new ResponseEntity<>(u, HttpStatus.OK);
		}).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

}
