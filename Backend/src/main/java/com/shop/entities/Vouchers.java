package com.shop.entities;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Vouchers implements Serializable {

	private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(unique=true, nullable=false, precision=10)
    private int id;
    
    @Column(nullable=false, length=12)
    private String code;
    
    @Column(nullable=false, precision=10)
    private int sale;
    
    @Column(nullable=false, precision=10)
    private int quantity;
    
	@Column(nullable = false, precision = 10)
	private int status;
    
    @Column(name="date_start", nullable=false)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime dateStart;
    
    @Column(name="date_end", nullable=false)
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime dateEnd;
    
	@ManyToOne(optional = false)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;
}
