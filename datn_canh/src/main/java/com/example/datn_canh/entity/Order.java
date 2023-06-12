package com.example.datn_canh.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "`order`")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "fullname")
    private String fullname;

    @Column(name = "phone")
    private Integer phone;

    @Column(name = "address")
    private String address;

    @Column(name = "note", length = 10000)
    private String note;

    @Column(name = "shipfee")
    private Double shipfee;

    @Column(name = "total")
    private Double total;

    @Column(name = "createdBy")
    private String createdBy;

    @Column(name = "order_type")
    private Integer orderType;

    @Column(name = "update_at")
    private LocalDate updateAt;

    @Column(name = "delete_at")
    private LocalDate deleteAt;

    @Column(name = "status")
    private Integer status;

    @Column(name = "create_at")
    private LocalDate createAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customers_id")
    private Customer customers;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "staff_id")
    private Staff staff;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "voucher_id")
    private Voucher voucher;

    @Column(name = "received_date")
    private LocalDate receivedDate;

}