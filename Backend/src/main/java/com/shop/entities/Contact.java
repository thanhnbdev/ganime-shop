package com.shop.entities;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Contact implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(unique = true, nullable = false, precision = 10)
	private int id;
	
	@Column(nullable = false, length = 255)
	private String name;
	
	@Column(nullable = false, length = 255)
	private String address;
	
	@Column(nullable = false, length = 255)
	private String email;
	
	@Column(nullable = false, length = 20)
	private String phone;
	
	@Column(nullable = false, length = 255)
	private String title;
	
	@Column(nullable = false, length = 255)
	private String content;
	
	@Column(nullable = false, precision = 10)
	private int status;

}
