package com.example.datn_ganime.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "promotion_detail", schema = "datn", catalog = "")
public class PromotionDetailEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;
    @Basic
    @Column(name = "id_promotion")
    private int idPromotion;
    @Basic
    @Column(name = "id_san_pham")
    private int idSanPham;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getIdPromotion() {
        return idPromotion;
    }

    public void setIdPromotion(int idPromotion) {
        this.idPromotion = idPromotion;
    }

    public int getIdSanPham() {
        return idSanPham;
    }

    public void setIdSanPham(int idSanPham) {
        this.idSanPham = idSanPham;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        PromotionDetailEntity that = (PromotionDetailEntity) o;

        if (id != that.id) return false;
        if (idPromotion != that.idPromotion) return false;
        if (idSanPham != that.idSanPham) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + idPromotion;
        result = 31 * result + idSanPham;
        return result;
    }
}
