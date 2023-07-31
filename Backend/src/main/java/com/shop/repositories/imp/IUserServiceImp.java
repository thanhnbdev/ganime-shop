package com.shop.repositories.imp;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shop.entities.User;
import com.shop.repositories.irepo.IUserService;
import com.shop.repositories.repo.UserRepository;

@Service
public class IUserServiceImp implements IUserService {

	@Autowired
	private UserRepository userRepo;

	@Override
	public Iterable<User> findAll() {
		return userRepo.findAll();
	}

	@Override
	public Optional<User> findById(Integer id) {
		return userRepo.findById(id);
	}

	@Override
	public User save(User t) {
		return userRepo.save(t);
	}

	@Override
	public void remove(Integer id) {
		userRepo.deleteById(id);
	}

}
