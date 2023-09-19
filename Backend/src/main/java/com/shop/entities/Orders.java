package com.shop.entities;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Orders implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(unique = true, nullable = false, precision = 10)
	private int id;

	@Column(nullable = false, length = 255)
	private String address;
	
	@Column(nullable = false, length = 20)
	private String phone;

	@Column(nullable = false)
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm")
	private LocalDateTime date;
	
	@Column(nullable = false, length = 5)
	private String size;
	
	@Column(nullable = false, length = 20)
	private String color;
	
	@Column(nullable = false, length = 255)
	private String dateEnd;

	@Column(nullable = false, precision = 10)
	private int quantity;
	
    @Column(nullable=false, precision=10)
    private int code;
    
    @Column(nullable=false, length=3)
    private boolean selected;

	@Column(nullable = false, precision = 10)
	private int status;

	@OneToMany(mappedBy = "orders", cascade = CascadeType.ALL)
	@JsonIgnore
	private Set<OrderDetail> orderDetail;

	@ManyToOne(optional = false)
	@JoinColumn(name = "product_id", nullable = false)
	private Product product;

	@ManyToOne(optional = false)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

}
