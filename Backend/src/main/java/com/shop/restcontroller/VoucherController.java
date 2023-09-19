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

import com.shop.entities.Vouchers;
import com.shop.repositories.irepo.IVoucherService;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/voucher")
public class VoucherController {

	@Autowired
	IVoucherService repository;

	// getAll
	@GetMapping
	public ResponseEntity<Iterable<Vouchers>> getAllVouchers() {
		return new ResponseEntity<>(repository.findAll(), HttpStatus.OK);
	}

	// add new
	@PostMapping
	public ResponseEntity<Vouchers> createNewVouchers(@RequestBody Vouchers voucher) {
		return new ResponseEntity<>(repository.save(voucher), HttpStatus.OK);
	}

	// getById
	@GetMapping("/{id}")
	public ResponseEntity<Vouchers> getVouchers(@PathVariable Integer id) {
		Optional<Vouchers> vouchersOptional = repository.findById(id);
		return vouchersOptional.map(vouchers -> new ResponseEntity<>(vouchers, HttpStatus.OK))
				.orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	// update
	@PutMapping("/{id}")
	public ResponseEntity<Vouchers> updateVouchers(@PathVariable Integer id, @RequestBody Vouchers vouchers) {
		Optional<Vouchers> vouchersOptional = repository.findById(id);
		return vouchersOptional.map(u -> {
			vouchers.setId(u.getId());
			return new ResponseEntity<>(repository.save(vouchers), HttpStatus.OK);
		}).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	// delete
	@DeleteMapping("/{id}")
	public ResponseEntity<Vouchers> deleteVouchers(@PathVariable Integer id) {
		Optional<Vouchers> vouchersOptional = repository.findById(id);
		return vouchersOptional.map(u -> {
			repository.remove(id);
			return new ResponseEntity<>(u, HttpStatus.OK);
		}).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

}
