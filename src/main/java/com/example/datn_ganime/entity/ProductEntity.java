package com.example.datn_ganime.entity;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
@Table(name = "product", schema = "datn", catalog = "")
public class ProductEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;
    @Basic
    @Column(name = "ten_san_pham")
    private String tenSanPham;
    @Basic
    @Column(name = "gia")
    private double gia;
    @Basic
    @Column(name = "so_luong")
    private int soLuong;
    @Basic
    @Column(name = "create_at")
    private Timestamp createAt;
    @Basic
    @Column(name = "anh")
    private String anh;
    @Basic
    @Column(name = "update_at")
    private Timestamp updateAt;
    @Basic
    @Column(name = "delete_at")
    private Timestamp deleteAt;
    @Basic
    @Column(name = "mo_ta")
    private String moTa;
    @Basic
    @Column(name = "id_gender")
    private int idGender;
    @Basic
    @Column(name = "id_material")
    private int idMaterial;

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

    public double getGia() {
        return gia;
    }

    public void setGia(double gia) {
        this.gia = gia;
    }

    public int getSoLuong() {
        return soLuong;
    }

    public void setSoLuong(int soLuong) {
        this.soLuong = soLuong;
    }

    public Timestamp getCreateAt() {
        return createAt;
    }

    public void setCreateAt(Timestamp createAt) {
        this.createAt = createAt;
    }

    public String getAnh() {
        return anh;
    }

    public void setAnh(String anh) {
        this.anh = anh;
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

    public String getMoTa() {
        return moTa;
    }

    public void setMoTa(String moTa) {
        this.moTa = moTa;
    }

    public int getIdGender() {
        return idGender;
    }

    public void setIdGender(int idGender) {
        this.idGender = idGender;
    }

    public int getIdMaterial() {
        return idMaterial;
    }

    public void setIdMaterial(int idMaterial) {
        this.idMaterial = idMaterial;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ProductEntity that = (ProductEntity) o;

        if (id != that.id) return false;
        if (Double.compare(that.gia, gia) != 0) return false;
        if (soLuong != that.soLuong) return false;
        if (idGender != that.idGender) return false;
        if (idMaterial != that.idMaterial) return false;
        if (tenSanPham != null ? !tenSanPham.equals(that.tenSanPham) : that.tenSanPham != null) return false;
        if (createAt != null ? !createAt.equals(that.createAt) : that.createAt != null) return false;
        if (anh != null ? !anh.equals(that.anh) : that.anh != null) return false;
        if (updateAt != null ? !updateAt.equals(that.updateAt) : that.updateAt != null) return false;
        if (deleteAt != null ? !deleteAt.equals(that.deleteAt) : that.deleteAt != null) return false;
        if (moTa != null ? !moTa.equals(that.moTa) : that.moTa != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result;
        long temp;
        result = id;
        result = 31 * result + (tenSanPham != null ? tenSanPham.hashCode() : 0);
        temp = Double.doubleToLongBits(gia);
        result = 31 * result + (int) (temp ^ (temp >>> 32));
        result = 31 * result + soLuong;
        result = 31 * result + (createAt != null ? createAt.hashCode() : 0);
        result = 31 * result + (anh != null ? anh.hashCode() : 0);
        result = 31 * result + (updateAt != null ? updateAt.hashCode() : 0);
        result = 31 * result + (deleteAt != null ? deleteAt.hashCode() : 0);
        result = 31 * result + (moTa != null ? moTa.hashCode() : 0);
        result = 31 * result + idGender;
        result = 31 * result + idMaterial;
        return result;
    }
}
