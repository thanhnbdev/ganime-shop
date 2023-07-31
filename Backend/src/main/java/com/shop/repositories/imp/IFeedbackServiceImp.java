package com.shop.repositories.imp;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shop.entities.Feedback;
import com.shop.repositories.irepo.IFeedbackService;
import com.shop.repositories.repo.FeedbackRepository;

@Service
public class IFeedbackServiceImp implements IFeedbackService {

	@Autowired
	private FeedbackRepository feedbackRepo;

	@Override
	public Iterable<Feedback> findAll() {
		return feedbackRepo.findAll();
	}

	@Override
	public Optional<Feedback> findById(Integer id) {
		return feedbackRepo.findById(id);
	}

	@Override
	public Feedback save(Feedback t) {
		return feedbackRepo.save(t);
	}

	@Override
	public void remove(Integer id) {
		feedbackRepo.deleteById(id);
	}

}
