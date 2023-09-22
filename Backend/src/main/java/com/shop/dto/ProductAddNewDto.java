package com.shop.dto;

import com.shop.entities.Product;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductAddNewDto {
	private Product product;
	private SizeColorDto sizeColor;
}
