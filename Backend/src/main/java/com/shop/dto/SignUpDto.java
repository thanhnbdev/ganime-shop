package com.shop.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignUpDto {
	private String fullname;

	private String username;

	private String email;

	private String password;

	private String avatar;
}
