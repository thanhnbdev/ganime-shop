package com.example.datn_ganime.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "color", schema = "datn", catalog = "")
public class ColorEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;
    @Basic
    @Column(name = "ten_mau")
    private String tenMau;
    @Basic
    @Column(name = "trang_thai")
    private Integer trangThai;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTenMau() {
        return tenMau;
    }

    public void setTenMau(String tenMau) {
        this.tenMau = tenMau;
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

        ColorEntity that = (ColorEntity) o;

        if (id != that.id) return false;
        if (tenMau != null ? !tenMau.equals(that.tenMau) : that.tenMau != null) return false;
        if (trangThai != null ? !trangThai.equals(that.trangThai) : that.trangThai != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (tenMau != null ? tenMau.hashCode() : 0);
        result = 31 * result + (trangThai != null ? trangThai.hashCode() : 0);
        return result;
    }
}
