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

import com.shop.entities.Feedback;
import com.shop.repositories.irepo.IFeedbackService;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/feedback")
public class FeedbackController {

	@Autowired
	IFeedbackService repository;

	// getAll
	@GetMapping
	public ResponseEntity<Iterable<Feedback>> getAllFeedback() {
		return new ResponseEntity<>(repository.findAll(), HttpStatus.OK);
	}

	// add new
	@PostMapping
	public ResponseEntity<Feedback> createNewFeedback(@RequestBody Feedback feedback) {
		return new ResponseEntity<>(repository.save(feedback), HttpStatus.OK);
	}

	// getById
	@GetMapping("/{id}")
	public ResponseEntity<Feedback> getFeedback(@PathVariable Integer id) {
		Optional<Feedback> feedbackOptional = repository.findById(id);
		return feedbackOptional.map(feedback -> new ResponseEntity<>(feedback, HttpStatus.OK))
				.orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	// update
	@PutMapping("/{id}")
	public ResponseEntity<Feedback> updateFeedback(@PathVariable Integer id, @RequestBody Feedback feedback) {
		Optional<Feedback> feedbackOptional = repository.findById(id);
		return feedbackOptional.map(u -> {
			feedback.setId(u.getId());
			return new ResponseEntity<>(repository.save(feedback), HttpStatus.OK);
		}).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	// delete
	@DeleteMapping("/{id}")
	public ResponseEntity<Feedback> deleteFeedback(@PathVariable Integer id) {
		Optional<Feedback> feedbackOptional = repository.findById(id);
		return feedbackOptional.map(u -> {
			repository.remove(id);
			return new ResponseEntity<>(u, HttpStatus.OK);
		}).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

}
