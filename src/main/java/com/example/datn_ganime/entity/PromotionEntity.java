package com.example.datn_ganime.entity;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
@Table(name = "promotion", schema = "datn", catalog = "")
public class PromotionEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;
    @Basic
    @Column(name = "ten_khuyen_mai")
    private String tenKhuyenMai;
    @Basic
    @Column(name = "gia_tri")
    private int giaTri;
    @Basic
    @Column(name = "ngay_bat_dau")
    private Timestamp ngayBatDau;
    @Basic
    @Column(name = "ngay_ket_thuc")
    private Timestamp ngayKetThuc;
    @Basic
    @Column(name = "so_luong")
    private int soLuong;
    @Basic
    @Column(name = "trang_thai")
    private int trangThai;
    @Basic
    @Column(name = "delete_at")
    private Timestamp deleteAt;
    @Basic
    @Column(name = "update_at")
    private Timestamp updateAt;
    @Basic
    @Column(name = "create_at")
    private Timestamp createAt;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTenKhuyenMai() {
        return tenKhuyenMai;
    }

    public void setTenKhuyenMai(String tenKhuyenMai) {
        this.tenKhuyenMai = tenKhuyenMai;
    }

    public int getGiaTri() {
        return giaTri;
    }

    public void setGiaTri(int giaTri) {
        this.giaTri = giaTri;
    }

    public Timestamp getNgayBatDau() {
        return ngayBatDau;
    }

    public void setNgayBatDau(Timestamp ngayBatDau) {
        this.ngayBatDau = ngayBatDau;
    }

    public Timestamp getNgayKetThuc() {
        return ngayKetThuc;
    }

    public void setNgayKetThuc(Timestamp ngayKetThuc) {
        this.ngayKetThuc = ngayKetThuc;
    }

    public int getSoLuong() {
        return soLuong;
    }

    public void setSoLuong(int soLuong) {
        this.soLuong = soLuong;
    }

    public int getTrangThai() {
        return trangThai;
    }

    public void setTrangThai(int trangThai) {
        this.trangThai = trangThai;
    }

    public Timestamp getDeleteAt() {
        return deleteAt;
    }

    public void setDeleteAt(Timestamp deleteAt) {
        this.deleteAt = deleteAt;
    }

    public Timestamp getUpdateAt() {
        return updateAt;
    }

    public void setUpdateAt(Timestamp updateAt) {
        this.updateAt = updateAt;
    }

    public Timestamp getCreateAt() {
        return createAt;
    }

    public void setCreateAt(Timestamp createAt) {
        this.createAt = createAt;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        PromotionEntity that = (PromotionEntity) o;

        if (id != that.id) return false;
        if (giaTri != that.giaTri) return false;
        if (soLuong != that.soLuong) return false;
        if (trangThai != that.trangThai) return false;
        if (tenKhuyenMai != null ? !tenKhuyenMai.equals(that.tenKhuyenMai) : that.tenKhuyenMai != null) return false;
        if (ngayBatDau != null ? !ngayBatDau.equals(that.ngayBatDau) : that.ngayBatDau != null) return false;
        if (ngayKetThuc != null ? !ngayKetThuc.equals(that.ngayKetThuc) : that.ngayKetThuc != null) return false;
        if (deleteAt != null ? !deleteAt.equals(that.deleteAt) : that.deleteAt != null) return false;
        if (updateAt != null ? !updateAt.equals(that.updateAt) : that.updateAt != null) return false;
        if (createAt != null ? !createAt.equals(that.createAt) : that.createAt != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (tenKhuyenMai != null ? tenKhuyenMai.hashCode() : 0);
        result = 31 * result + giaTri;
        result = 31 * result + (ngayBatDau != null ? ngayBatDau.hashCode() : 0);
        result = 31 * result + (ngayKetThuc != null ? ngayKetThuc.hashCode() : 0);
        result = 31 * result + soLuong;
        result = 31 * result + trangThai;
        result = 31 * result + (deleteAt != null ? deleteAt.hashCode() : 0);
        result = 31 * result + (updateAt != null ? updateAt.hashCode() : 0);
        result = 31 * result + (createAt != null ? createAt.hashCode() : 0);
        return result;
    }
}
