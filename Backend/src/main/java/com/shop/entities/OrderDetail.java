package com.shop.entities;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class OrderDetail implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(unique = true, nullable = false, precision = 10)
	private int id;

	@Column(nullable = false, precision = 10)
	private int quantity;

	@Column(nullable = false, precision = 10)
	private int status;
	
	@Column(nullable = false, precision = 10)
	private String size;
	
	@Column(nullable = false, length = 20)
	private String color;
	
	@Column(nullable = false, precision = 12)
	private float fee;

	@ManyToOne(optional = false, cascade = CascadeType.ALL)
	@JoinColumn(name = "order_id", nullable = false)
	private Orders orders;

}
