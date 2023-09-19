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

import com.shop.entities.Contact;
import com.shop.repositories.irepo.IContactService;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/contact")
public class ContactController {

	@Autowired
	IContactService repository;

	// getAll
	@GetMapping
	public ResponseEntity<Iterable<Contact>> getAllContact() {
		return new ResponseEntity<>(repository.findAll(), HttpStatus.OK);
	}

	// add new
	@PostMapping
	public ResponseEntity<Contact> createNewContact(@RequestBody Contact contact) {
		return new ResponseEntity<>(repository.save(contact), HttpStatus.OK);
	}

	// getById
	@GetMapping("/{id}")
	public ResponseEntity<Contact> getContact(@PathVariable Integer id) {
		Optional<Contact> contactOptional = repository.findById(id);
		return contactOptional.map(Contact -> new ResponseEntity<>(Contact, HttpStatus.OK))
				.orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	// update
	@PutMapping("/{id}")
	public ResponseEntity<Contact> updateContact(@PathVariable Integer id, @RequestBody Contact contact) {
		Optional<Contact> contactOptional = repository.findById(id);
		return contactOptional.map(u -> {
			contact.setId(u.getId());
			return new ResponseEntity<>(repository.save(contact), HttpStatus.OK);
		}).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	// delete
	@DeleteMapping("/{id}")
	public ResponseEntity<Contact> deleteContact(@PathVariable Integer id) {
		Optional<Contact> contactOptional = repository.findById(id);
		return contactOptional.map(u -> {
			repository.remove(id);
			return new ResponseEntity<>(u, HttpStatus.OK);
		}).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

}
