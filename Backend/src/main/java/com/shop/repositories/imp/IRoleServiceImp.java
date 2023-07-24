package com.shop.repositories.imp;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shop.entities.Role;
import com.shop.repositories.irepo.IRoleService;
import com.shop.repositories.repo.RoleRepository;

@Service
public class IRoleServiceImp implements IRoleService {

	@Autowired
	private RoleRepository roleRepo;

	@Override
	public Iterable<Role> findAll() {
		return roleRepo.findAll();
	}

	@Override
	public Optional<Role> findById(Integer id) {
		return roleRepo.findById(id);
	}

	@Override
	public Role save(Role t) {
		return roleRepo.save(t);
	}

	@Override
	public void remove(Integer id) {
		roleRepo.deleteById(id);
	}

}
