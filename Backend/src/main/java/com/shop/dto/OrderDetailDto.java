package com.shop.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderDetailDto {
	private List<AtStoreProductDto> atStore;
	private boolean check;
	private String color;
	private String user;
	private String phone;
	private String address;
	private int sale;
	private int status;
	private float fee;
}
