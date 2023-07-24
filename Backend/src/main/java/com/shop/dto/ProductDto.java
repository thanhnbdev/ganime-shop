package com.shop.dto;

import com.shop.entities.Product;
import com.shop.entities.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductDto {
	private Product product;
	private Size size;
}
