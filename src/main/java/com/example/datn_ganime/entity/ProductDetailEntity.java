package com.example.datn_ganime.entity;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
@Table(name = "product_detail", schema = "datn", catalog = "")
public class ProductDetailEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;
    @Basic
    @Column(name = "ten_san_pham")
    private String tenSanPham;
    @Basic
    @Column(name = "so_luong")
    private int soLuong;
    @Basic
    @Column(name = "mo_ta")
    private String moTa;
    @Basic
    @Column(name = "anh")
    private String anh;
    @Basic
    @Column(name = "create_at")
    private Timestamp createAt;
    @Basic
    @Column(name = "update_at")
    private Timestamp updateAt;
    @Basic
    @Column(name = "delete_at")
    private Timestamp deleteAt;
    @Basic
    @Column(name = "trang_thai")
    private int trangThai;
    @Basic
    @Column(name = "id_san_pham")
    private int idSanPham;
    @Basic
    @Column(name = "id_size")
    private int idSize;
    @Basic
    @Column(name = "id_color")
    private int idColor;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTenSanPham() {
        return tenSanPham;
    }

    public void setTenSanPham(String tenSanPham) {
        this.tenSanPham = tenSanPham;
    }

    public int getSoLuong() {
        return soLuong;
    }

    public void setSoLuong(int soLuong) {
        this.soLuong = soLuong;
    }

    public String getMoTa() {
        return moTa;
    }

    public void setMoTa(String moTa) {
        this.moTa = moTa;
    }

    public String getAnh() {
        return anh;
    }

    public void setAnh(String anh) {
        this.anh = anh;
    }

    public Timestamp getCreateAt() {
        return createAt;
    }

    public void setCreateAt(Timestamp createAt) {
        this.createAt = createAt;
    }

    public Timestamp getUpdateAt() {
        return updateAt;
    }

    public void setUpdateAt(Timestamp updateAt) {
        this.updateAt = updateAt;
    }

    public Timestamp getDeleteAt() {
        return deleteAt;
    }

    public void setDeleteAt(Timestamp deleteAt) {
        this.deleteAt = deleteAt;
    }

    public int getTrangThai() {
        return trangThai;
    }

    public void setTrangThai(int trangThai) {
        this.trangThai = trangThai;
    }

    public int getIdSanPham() {
        return idSanPham;
    }

    public void setIdSanPham(int idSanPham) {
        this.idSanPham = idSanPham;
    }

    public int getIdSize() {
        return idSize;
    }

    public void setIdSize(int idSize) {
        this.idSize = idSize;
    }

    public int getIdColor() {
        return idColor;
    }

    public void setIdColor(int idColor) {
        this.idColor = idColor;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ProductDetailEntity that = (ProductDetailEntity) o;

        if (id != that.id) return false;
        if (soLuong != that.soLuong) return false;
        if (trangThai != that.trangThai) return false;
        if (idSanPham != that.idSanPham) return false;
        if (idSize != that.idSize) return false;
        if (idColor != that.idColor) return false;
        if (tenSanPham != null ? !tenSanPham.equals(that.tenSanPham) : that.tenSanPham != null) return false;
        if (moTa != null ? !moTa.equals(that.moTa) : that.moTa != null) return false;
        if (anh != null ? !anh.equals(that.anh) : that.anh != null) return false;
        if (createAt != null ? !createAt.equals(that.createAt) : that.createAt != null) return false;
        if (updateAt != null ? !updateAt.equals(that.updateAt) : that.updateAt != null) return false;
        if (deleteAt != null ? !deleteAt.equals(that.deleteAt) : that.deleteAt != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (tenSanPham != null ? tenSanPham.hashCode() : 0);
        result = 31 * result + soLuong;
        result = 31 * result + (moTa != null ? moTa.hashCode() : 0);
        result = 31 * result + (anh != null ? anh.hashCode() : 0);
        result = 31 * result + (createAt != null ? createAt.hashCode() : 0);
        result = 31 * result + (updateAt != null ? updateAt.hashCode() : 0);
        result = 31 * result + (deleteAt != null ? deleteAt.hashCode() : 0);
        result = 31 * result + trangThai;
        result = 31 * result + idSanPham;
        result = 31 * result + idSize;
        result = 31 * result + idColor;
        return result;
    }
}
