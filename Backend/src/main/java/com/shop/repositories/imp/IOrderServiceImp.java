package com.shop.repositories.imp;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shop.entities.Orders;
import com.shop.repositories.irepo.IOrderService;
import com.shop.repositories.repo.OrderRepository;

@Service
public class IOrderServiceImp implements IOrderService {

	@Autowired
	private OrderRepository orderRepo;

	@Override
	public Iterable<Orders> findAll() {
		return orderRepo.findAll();
	}

	@Override
	public Optional<Orders> findById(Integer id) {
		return orderRepo.findById(id);
	}

	@Override
	public Orders save(Orders t) {
		return orderRepo.save(t);
	}

	@Override
	public void remove(Integer id) {
		orderRepo.deleteById(id);
	}

}
