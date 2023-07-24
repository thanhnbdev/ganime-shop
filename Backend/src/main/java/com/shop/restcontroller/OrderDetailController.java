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

import com.shop.entities.OrderDetail;
import com.shop.entities.Orders;
import com.shop.repositories.irepo.IOrderDetailService;
import com.shop.repositories.irepo.IOrderService;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/order-detail")
public class OrderDetailController {

	@Autowired
	IOrderDetailService repository;
	@Autowired
	IOrderService repo;

	// getAll
	@GetMapping
	public ResponseEntity<Iterable<OrderDetail>> getAllOrderDetail() {
		return new ResponseEntity<>(repository.findAll(), HttpStatus.OK);
	}

	// add new
	@PostMapping
	public ResponseEntity<OrderDetail> createNewOrderDetail(@RequestBody OrderDetail ordetail) {
		Orders order = new Orders();
		OrderDetail orderDetail = new OrderDetail();
		order.setAddress(ordetail.getOrders().getAddress());
		order.setPhone(ordetail.getOrders().getPhone());
		order.setDate(ordetail.getOrders().getDate());
		order.setDateEnd(ordetail.getOrders().getDateEnd());
		order.setQuantity(ordetail.getOrders().getQuantity());
		order.setSize(ordetail.getSize());
		order.setColor(ordetail.getColor());
		order.setSelected(false);
		order.setStatus(1);
		order.setProduct(ordetail.getOrders().getProduct());
		order.setUser(ordetail.getOrders().getUser());
		orderDetail.setQuantity(order.getQuantity());
		orderDetail.setSize(ordetail.getSize());
		orderDetail.setColor(ordetail.getColor());
		orderDetail.setOrders(order);
		orderDetail.setStatus(1);
		repo.save(order);
		return new ResponseEntity<>(repository.save(orderDetail), HttpStatus.OK);
	}

	// getById
	@GetMapping("/{id}")
	public ResponseEntity<OrderDetail> getOrderDetail(@PathVariable Integer id) {
		Optional<OrderDetail> orderDetailOptional = repository.findById(id);
		return orderDetailOptional.map(orderDetail -> new ResponseEntity<>(orderDetail, HttpStatus.OK))
				.orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	// update
	@PutMapping("/{id}")
	public ResponseEntity<OrderDetail> updateOrderDetail(@PathVariable Integer id, @RequestBody OrderDetail orderDetail) {
		Optional<OrderDetail> orderDetailOptional = repository.findById(id);
		return orderDetailOptional.map(u -> {
			orderDetail.setId(u.getId());
			return new ResponseEntity<>(repository.save(orderDetail), HttpStatus.OK);
		}).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	// delete
	@DeleteMapping("/{id}")
	public ResponseEntity<OrderDetail> deleteOrderDetail(@PathVariable Integer id) {
		Optional<OrderDetail> orderDetailOptional = repository.findById(id);
		return orderDetailOptional.map(u -> {
			repository.remove(id);
			return new ResponseEntity<>(u, HttpStatus.OK);
		}).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

}
