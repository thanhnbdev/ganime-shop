package com.shop.repositories.imp;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shop.entities.Vouchers;
import com.shop.repositories.irepo.IVoucherService;
import com.shop.repositories.repo.VoucherRepository;

@Service
public class IVoucherServiceImp implements IVoucherService {

	@Autowired
	private VoucherRepository voucherRepo;

	@Override
	public Iterable<Vouchers> findAll() {
		return voucherRepo.findAll();
	}

	@Override
	public Optional<Vouchers> findById(Integer id) {
		return voucherRepo.findById(id);
	}

	@Override
	public Vouchers save(Vouchers t) {
		return voucherRepo.save(t);
	}

	@Override
	public void remove(Integer id) {
		voucherRepo.deleteById(id);
	}

}
