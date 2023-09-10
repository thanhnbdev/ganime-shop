package com.shop.dto;

import com.shop.entities.Product;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AtStoreProductDto {
	private Product product;
	private String size;
	private String color;
	private int quantity;
}
