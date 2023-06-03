package com.example.datn_ganime.entity;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
@Table(name = "voucher", schema = "datn", catalog = "")
public class VoucherEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;
    @Basic
    @Column(name = "ten_voucher")
    private String tenVoucher;
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
    @Column(name = "dieu_kien")
    private double dieuKien;
    @Basic
    @Column(name = "so_luong")
    private int soLuong;
    @Basic
    @Column(name = "trang_thai")
    private int trangThai;
    @Basic
    @Column(name = "create_at")
    private Timestamp createAt;
    @Basic
    @Column(name = "delete_at")
    private Timestamp deleteAt;
    @Basic
    @Column(name = "update_at")
    private Timestamp updateAt;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTenVoucher() {
        return tenVoucher;
    }

    public void setTenVoucher(String tenVoucher) {
        this.tenVoucher = tenVoucher;
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

    public double getDieuKien() {
        return dieuKien;
    }

    public void setDieuKien(double dieuKien) {
        this.dieuKien = dieuKien;
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

    public Timestamp getCreateAt() {
        return createAt;
    }

    public void setCreateAt(Timestamp createAt) {
        this.createAt = createAt;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        VoucherEntity that = (VoucherEntity) o;

        if (id != that.id) return false;
        if (giaTri != that.giaTri) return false;
        if (Double.compare(that.dieuKien, dieuKien) != 0) return false;
        if (soLuong != that.soLuong) return false;
        if (trangThai != that.trangThai) return false;
        if (tenVoucher != null ? !tenVoucher.equals(that.tenVoucher) : that.tenVoucher != null) return false;
        if (ngayBatDau != null ? !ngayBatDau.equals(that.ngayBatDau) : that.ngayBatDau != null) return false;
        if (ngayKetThuc != null ? !ngayKetThuc.equals(that.ngayKetThuc) : that.ngayKetThuc != null) return false;
        if (createAt != null ? !createAt.equals(that.createAt) : that.createAt != null) return false;
        if (deleteAt != null ? !deleteAt.equals(that.deleteAt) : that.deleteAt != null) return false;
        if (updateAt != null ? !updateAt.equals(that.updateAt) : that.updateAt != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result;
        long temp;
        result = id;
        result = 31 * result + (tenVoucher != null ? tenVoucher.hashCode() : 0);
        result = 31 * result + giaTri;
        result = 31 * result + (ngayBatDau != null ? ngayBatDau.hashCode() : 0);
        result = 31 * result + (ngayKetThuc != null ? ngayKetThuc.hashCode() : 0);
        temp = Double.doubleToLongBits(dieuKien);
        result = 31 * result + (int) (temp ^ (temp >>> 32));
        result = 31 * result + soLuong;
        result = 31 * result + trangThai;
        result = 31 * result + (createAt != null ? createAt.hashCode() : 0);
        result = 31 * result + (deleteAt != null ? deleteAt.hashCode() : 0);
        result = 31 * result + (updateAt != null ? updateAt.hashCode() : 0);
        return result;
    }
}
