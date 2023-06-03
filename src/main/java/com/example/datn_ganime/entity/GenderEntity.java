package com.example.datn_ganime.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "gender", schema = "datn", catalog = "")
public class GenderEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;
    @Basic
    @Column(name = "ten")
    private String ten;
    @Basic
    @Column(name = "trang_thai")
    private Integer trangThai;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTen() {
        return ten;
    }

    public void setTen(String ten) {
        this.ten = ten;
    }

    public Integer getTrangThai() {
        return trangThai;
    }

    public void setTrangThai(Integer trangThai) {
        this.trangThai = trangThai;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        GenderEntity that = (GenderEntity) o;

        if (id != that.id) return false;
        if (ten != null ? !ten.equals(that.ten) : that.ten != null) return false;
        if (trangThai != null ? !trangThai.equals(that.trangThai) : that.trangThai != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (ten != null ? ten.hashCode() : 0);
        result = 31 * result + (trangThai != null ? trangThai.hashCode() : 0);
        return result;
    }
}
