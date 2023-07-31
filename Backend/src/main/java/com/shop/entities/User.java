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
public class User implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@EqualsAndHashCode.Include // important, only on the PK
	@Column(unique = true, nullable = false, precision = 10)
	private int id;
	
	@Column(nullable = false, length = 255)
	private String fullname;
	
	@Column(nullable = false, length = 255)
	private String username;
	
	@Column(nullable = false, length = 255)
	private String email;
	
	@Column(nullable = false, length = 255)
	private String password;
	
	@Column(nullable = false, length = 255)
	private String avatar;
	
	@Column(nullable = false, precision = 10)
	private int status;
	
    @OneToMany(mappedBy="user")
    @JsonIgnore
    private Set<Favourite> favourite;
	
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "authority", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> role;
	
	@OneToMany(mappedBy = "user")
	@JsonIgnore
	private Set<Orders> orders;
	
	@OneToMany(mappedBy = "user")
	@JsonIgnore
	private Set<Vouchers> vouchers;

}
