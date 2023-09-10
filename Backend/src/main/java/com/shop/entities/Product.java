package com.shop.entities;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true) // important
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Product implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@EqualsAndHashCode.Include // important, only on the PK
	@Column(unique = true, nullable = false, precision = 10)
	private int id;

	@Column(nullable = false, length = 255)
	private String name;

	@Column(nullable = false, length = 255)
	private String image;

	@Column(nullable = false, precision = 12)
	private float price;

	@Column(nullable = false, length = 255)
	private String description;

	@Column(nullable = false, length = 255)
	private String brand;
	
	@Column(nullable = false, precision = 10)
	private int quantity;

	@Column(nullable = false, precision = 10)
	private int status;

	@ManyToOne(optional = false)
	@JoinColumn(name = "category_id", nullable = false)
	private Category category;
	
	@OneToMany(mappedBy = "product")
	@JsonIgnore
	private Set<Orders> orders;
	
    @OneToMany(mappedBy="product")
    @JsonIgnore
    private Set<Favourite> favourite;
	
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "product_size", joinColumns = @JoinColumn(name = "id_product"), inverseJoinColumns = @JoinColumn(name = "id_size"))
	private Set<Size> size;
	
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "product_color", joinColumns = @JoinColumn(name = "product_id"), inverseJoinColumns = @JoinColumn(name = "color_id"))
	private Set<Color> color;

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "feedback", joinColumns = @JoinColumn(name = "product_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
	private Set<User> user;

}
