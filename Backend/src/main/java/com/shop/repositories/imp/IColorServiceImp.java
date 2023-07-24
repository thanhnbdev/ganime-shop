package com.shop.repositories.imp;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shop.entities.Color;
import com.shop.repositories.irepo.IColorService;
import com.shop.repositories.repo.ColorRepository;

@Service
public class IColorServiceImp implements IColorService {

	@Autowired
	private ColorRepository colorRepo;

	@Override
	public Iterable<Color> findAll() {
		return colorRepo.findAll();
	}

	@Override
	public Optional<Color> findById(Integer id) {
		return colorRepo.findById(id);
	}

	@Override
	public Color save(Color t) {
		return colorRepo.save(t);
	}

	@Override
	public void remove(Integer id) {
		colorRepo.deleteById(id);
	}

}
