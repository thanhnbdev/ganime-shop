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

import com.shop.entities.Orders;
import com.shop.repositories.irepo.IOrderService;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/order")
public class OrderController {

	@Autowired
	IOrderService repository;

	// getAll
	@GetMapping
	public ResponseEntity<Iterable<Orders>> getAllOrders() {
		return new ResponseEntity<>(repository.findAll(), HttpStatus.OK);
	}

	// add new
	@PostMapping
	public ResponseEntity<Orders> createNewOrders(@RequestBody Orders order) {
		return new ResponseEntity<>(repository.save(order), HttpStatus.OK);
	}

	// getById
	@GetMapping("/{id}")
	public ResponseEntity<Orders> getOrders(@PathVariable Integer id) {
		Optional<Orders> ordersOptional = repository.findById(id);
		return ordersOptional.map(order -> new ResponseEntity<>(order, HttpStatus.OK))
				.orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	// update
	@PutMapping("/{id}")
	public ResponseEntity<Orders> updateOrders(@PathVariable Integer id, @RequestBody Orders order) {
		Optional<Orders> ordersOptional = repository.findById(id);
		return ordersOptional.map(u -> {
			order.setId(u.getId());
			return new ResponseEntity<>(repository.save(order), HttpStatus.OK);
		}).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	// delete
	@DeleteMapping("/{id}")
	public ResponseEntity<Orders> deleteOrders(@PathVariable Integer id) {
		Optional<Orders> ordersOptional = repository.findById(id);
		return ordersOptional.map(u -> {
			repository.remove(id);
			return new ResponseEntity<>(u, HttpStatus.OK);
		}).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

}
