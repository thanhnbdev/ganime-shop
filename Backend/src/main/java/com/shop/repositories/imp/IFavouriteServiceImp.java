package com.shop.repositories.imp;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shop.entities.Favourite;
import com.shop.repositories.irepo.IFavouriteService;
import com.shop.repositories.repo.FavouriteRepository;

@Service
public class IFavouriteServiceImp implements IFavouriteService {

	@Autowired
	private FavouriteRepository favRepo;

	@Override
	public Iterable<Favourite> findAll() {
		return favRepo.findAll();
	}

	@Override
	public Optional<Favourite> findById(Integer id) {
		return favRepo.findById(id);
	}

	@Override
	public Favourite save(Favourite f) {
		return favRepo.save(f);
	}

	@Override
	public void remove(Integer id) {
		favRepo.deleteById(id);
	}

}
