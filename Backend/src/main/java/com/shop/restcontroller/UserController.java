package com.shop.restcontroller;

import java.util.Optional;
import java.util.stream.StreamSupport;

import org.mindrot.jbcrypt.BCrypt;
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

import com.shop.dto.SignUpDto;
import com.shop.entities.Authority;
import com.shop.entities.Role;
import com.shop.entities.User;
import com.shop.repositories.irepo.IAuthoService;
import com.shop.repositories.irepo.IRoleService;
import com.shop.repositories.irepo.IUserService;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/user")
public class UserController {

	@Autowired
	IUserService repository;

	@Autowired
	IAuthoService authRepo;

	@Autowired
	IRoleService roleRepo;

	// getAll
	@GetMapping
	public ResponseEntity<Iterable<User>> getAllUser() {
		return new ResponseEntity<>(repository.findAll(), HttpStatus.OK);
	}
	
	// login
	@GetMapping("/{username}/{password}")
	public ResponseEntity<Optional<User>> getUserLogin(@PathVariable("username") String username,
			@PathVariable("password") String password) {
		Iterable<User> user = repository.findAll();
		Optional<User> result = StreamSupport.stream(user.spliterator(), false)
				.filter(u -> u.getUsername().equals(username) && BCrypt.checkpw(password, u.getPassword()))
				.findFirst();
		return new ResponseEntity<>(result, HttpStatus.OK);
	}

	// add new
	@PostMapping
	public ResponseEntity<User> createNewUser(@RequestBody SignUpDto user) {
		User u = new User();
		Authority auth = new Authority();
		Optional<Role> role = roleRepo.findById(3);
		u.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()));
		u.setAvatar("https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=avatar");
		u.setEmail(user.getEmail());
		u.setFullname(user.getFullname());
		u.setUsername(user.getUsername());
		u.setStatus(1);
		repository.save(u);
		auth.setUser(u);
		auth.setRole(role.get());
		authRepo.save(auth);
		return new ResponseEntity<>(repository.save(u), HttpStatus.OK);
	}

	// getById
	@GetMapping("/{id}")
	public ResponseEntity<User> getUser(@PathVariable Integer id) {
		Optional<User> userOptional = repository.findById(id);
		return userOptional.map(user -> new ResponseEntity<>(user, HttpStatus.OK))
				.orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	// update
	@PutMapping("/{id}")
	public ResponseEntity<User> updateUser(@PathVariable Integer id, @RequestBody User user) {
		Optional<User> userOptional = repository.findById(id);
		return userOptional.map(u -> {
			user.setId(u.getId());
			return new ResponseEntity<>(repository.save(user), HttpStatus.OK);
		}).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	// delete
	@DeleteMapping("/{id}")
	public ResponseEntity<User> deleteUser(@PathVariable Integer id) {
		Optional<User> userOptional = repository.findById(id);
		return userOptional.map(u -> {
			repository.remove(id);
			return new ResponseEntity<>(u, HttpStatus.OK);
		}).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

}
