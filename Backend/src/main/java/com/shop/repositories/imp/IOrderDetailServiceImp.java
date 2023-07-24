package com.shop.repositories.imp;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shop.entities.OrderDetail;
import com.shop.repositories.irepo.IOrderDetailService;
import com.shop.repositories.repo.OrderDetailRepository;

@Service
public class IOrderDetailServiceImp implements IOrderDetailService {

	@Autowired
	private OrderDetailRepository orderDetailRepo;

	@Override
	public Iterable<OrderDetail> findAll() {
		return orderDetailRepo.findAll();
	}

	@Override
	public Optional<OrderDetail> findById(Integer id) {
		return orderDetailRepo.findById(id);
	}

	@Override
	public OrderDetail save(OrderDetail t) {
		return orderDetailRepo.save(t);
	}

	@Override
	public void remove(Integer id) {
		orderDetailRepo.deleteById(id);
	}

}
