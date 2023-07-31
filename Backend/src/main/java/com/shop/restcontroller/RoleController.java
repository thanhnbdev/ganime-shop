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

import com.shop.entities.Role;
import com.shop.repositories.irepo.IRoleService;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/role")
public class RoleController {

	@Autowired
	IRoleService repository;

	// getAll
	@GetMapping
	public ResponseEntity<Iterable<Role>> getAllRole() {
		return new ResponseEntity<>(repository.findAll(), HttpStatus.OK);
	}

	// add new
	@PostMapping
	public ResponseEntity<Role> createNewRole(@RequestBody Role role) {
		return new ResponseEntity<>(repository.save(role), HttpStatus.OK);
	}

	// getById
	@GetMapping("/{id}")
	public ResponseEntity<Role> getRole(@PathVariable Integer id) {
		Optional<Role> roleOptional = repository.findById(id);
		return roleOptional.map(role -> new ResponseEntity<>(role, HttpStatus.OK))
				.orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	// update
	@PutMapping("/{id}")
	public ResponseEntity<Role> updateRole(@PathVariable Integer id, @RequestBody Role role) {
		Optional<Role> roleOptional = repository.findById(id);
		return roleOptional.map(u -> {
			role.setId(u.getId());
			return new ResponseEntity<>(repository.save(role), HttpStatus.OK);
		}).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	// delete
	@DeleteMapping("/{id}")
	public ResponseEntity<Role> deleteRole(@PathVariable Integer id) {
		Optional<Role> roleOptional = repository.findById(id);
		return roleOptional.map(u -> {
			repository.remove(id);
			return new ResponseEntity<>(u, HttpStatus.OK);
		}).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

}
