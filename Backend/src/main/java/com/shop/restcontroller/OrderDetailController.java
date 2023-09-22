package com.shop.restcontroller;

import java.time.LocalDateTime;
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

import com.shop.dto.AtStoreProductDto;
import com.shop.dto.OrderDetailDto;
import com.shop.entities.Authority;
import com.shop.entities.OrderDetail;
import com.shop.entities.Orders;
import com.shop.entities.Role;
import com.shop.entities.User;
import com.shop.repositories.imp.IAuthoServiceImp;
import com.shop.repositories.imp.IRoleServiceImp;
import com.shop.repositories.imp.IUserServiceImp;
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
	@Autowired
	IUserServiceImp userRepo;
	@Autowired
	IRoleServiceImp roleRepo;
	@Autowired
	IAuthoServiceImp authRepo;

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
		order.setCode(ordetail.getOrders().getCode());
		order.setProduct(ordetail.getOrders().getProduct());
		order.setUser(ordetail.getOrders().getUser());
		orderDetail.setQuantity(order.getQuantity());
		orderDetail.setSize(ordetail.getSize());
		orderDetail.setColor(ordetail.getColor());
		orderDetail.setFee(0);
		orderDetail.setOrders(order);
		orderDetail.setStatus(1);
		repo.save(order);
		return new ResponseEntity<>(repository.save(orderDetail), HttpStatus.OK);
	}

	// add new
	@PostMapping("/at-store")
	public ResponseEntity<?> createNewAtStore(@RequestBody OrderDetailDto ordetail) {
		User user = new User();
		if(!ordetail.isCheck()) {
			Authority auth = new Authority();
			Optional<Role> role = roleRepo.findById(3);
			user.setAvatar("https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore");
			user.setEmail("atstore@gmail.com");
			user.setFullname(ordetail.getUser());
			user.setPhone(ordetail.getPhone());
			user.setPassword("$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC");
			user.setStatus(1);
			user.setUsername(ordetail.getPhone());
			userRepo.save(user);
			auth.setUser(user);
			auth.setRole(role.get());
			authRepo.save(auth);
		} else {
			user= userRepo.findById(Integer.parseInt(ordetail.getUser())).get();
		}
		for (AtStoreProductDto as : ordetail.getAtStore()) {
			Orders order = new Orders();
			OrderDetail orderDetail = new OrderDetail();
			order.setAddress(ordetail.getAddress());
			order.setPhone(ordetail.getPhone());
			order.setDate(LocalDateTime.now());
			order.setDateEnd(LocalDateTime.now().toString());
			order.setQuantity(as.getQuantity());
			order.setSize(as.getSize());
			order.setColor(as.getColor());
			order.setCode(ordetail.getSale()+"");
			order.setSelected(false);
			order.setStatus(ordetail.getStatus());
			order.setProduct(as.getProduct());
			order.setUser(user);
			orderDetail.setQuantity(order.getQuantity());
			orderDetail.setSize(as.getSize());
			orderDetail.setColor(as.getColor());
			orderDetail.setOrders(order);
			orderDetail.setStatus(ordetail.getStatus());
			orderDetail.setFee(ordetail.getFee());
			repo.save(order);
			repository.save(orderDetail);
		}
		return new ResponseEntity<>("At Store", HttpStatus.OK);
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
	public ResponseEntity<OrderDetail> updateOrderDetail(@PathVariable Integer id,
			@RequestBody OrderDetail orderDetail) {
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
