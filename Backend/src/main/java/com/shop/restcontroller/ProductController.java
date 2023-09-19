package com.shop.restcontroller;

import java.util.ArrayList;
import java.util.List;
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

import com.shop.dto.ProductAddNewDto;
import com.shop.dto.ProductDto;
import com.shop.entities.Color;
import com.shop.entities.Product;
import com.shop.entities.ProductColor;
import com.shop.entities.ProductSize;
import com.shop.entities.Size;
import com.shop.repositories.irepo.IProductService;
import com.shop.repositories.repo.ProductColorRepository;
import com.shop.repositories.repo.ProductRepository;
import com.shop.repositories.repo.ProductSizeRepository;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/product")
public class ProductController {

	@Autowired
	IProductService repository;
	@Autowired
	ProductSizeRepository psRepo;
	@Autowired
	ProductColorRepository pcRepo;
	@Autowired
	ProductRepository proRepo;
	@Autowired
	ProductSizeRepository sizeRepo;
	@Autowired
	ProductColorRepository colorRepo;

	// getAll
	@GetMapping
	public ResponseEntity<Iterable<Product>> getAllProduct() {
		return new ResponseEntity<>(repository.findAll(), HttpStatus.OK);
	}
	
	// add new multile color and size
	@PostMapping("/add-new")
	public ResponseEntity<Product> createNewMulColorSize(@RequestBody ProductAddNewDto product) {
//		Product pro = new Product();
		repository.save(product.getProduct());
		List<Size> listSize = product.getSizeColor().getSize();
		List<Color> listColor = product.getSizeColor().getColor();
		for (Color color : listColor) {
			ProductColor pc = new ProductColor();
			pc.setColor(color);
			pc.setProduct(product.getProduct());
			colorRepo.save(pc);
		}
		for(Size size : listSize) {
			ProductSize ps = new ProductSize();
			ps.setSize(size);
			ps.setProduct(product.getProduct());
			sizeRepo.save(ps);
		}
		return new ResponseEntity<>(repository.save(product.getProduct()), HttpStatus.OK);
	}

	// add new
	@PostMapping
	public ResponseEntity<List<Product>> createNewProduct(@RequestBody ProductDto product) {
		List<Product> listProduct = new ArrayList<Product>();
		List<ProductColor> listColor = new ArrayList<ProductColor>();
		List<ProductSize> listSize = new ArrayList<ProductSize>();
		for (int i = 0; i < product.getQuantity(); i++) {
			Product p = new Product();
			p.setName(product.getProduct().getName());
			p.setBrand(product.getProduct().getBrand());
			p.setDescription(product.getProduct().getDescription());
			p.setImage(product.getProduct().getImage());
			p.setPrice(product.getProduct().getPrice());
			p.setQuantity(product.getProduct().getQuantity());
			p.setCategory(product.getProduct().getCategory());
			p.setStatus(product.getProduct().getStatus());
			listProduct.add(p);
		}
		proRepo.saveAll(listProduct);
		for (Product pro : listProduct) {
			ProductColor pc = new ProductColor();
			ProductSize ps = new ProductSize();
			pc.setColor(product.getColor());
			pc.setProduct(pro);
			ps.setSize(product.getSize());
			ps.setProduct(pro);
			listColor.add(pc);
			listSize.add(ps);
		}
		colorRepo.saveAll(listColor);
		sizeRepo.saveAll(listSize);
		return new ResponseEntity<>(proRepo.saveAll(listProduct), HttpStatus.OK);
	}

	// getById
	@GetMapping("/{id}")
	public ResponseEntity<Product> getProduct(@PathVariable Integer id) {
		Optional<Product> productOptional = repository.findById(id);
		return productOptional.map(product -> new ResponseEntity<>(product, HttpStatus.OK))
				.orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	// update
	@PutMapping("/{id}")
	public ResponseEntity<Product> updateProduct(@PathVariable Integer id, @RequestBody Product product) {
		Optional<Product> productOptional = repository.findById(id);
		return productOptional.map(u -> {
			product.setId(u.getId());
			return new ResponseEntity<>(repository.save(product), HttpStatus.OK);
		}).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	// delete
	@DeleteMapping("/{id}")
	public ResponseEntity<Product> deleteProduct(@PathVariable Integer id) {
		Optional<Product> productOptional = repository.findById(id);
		return productOptional.map(u -> {
			repository.remove(id);
			return new ResponseEntity<>(u, HttpStatus.OK);
		}).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

}
