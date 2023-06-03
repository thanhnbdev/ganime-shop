package com.example.datn_ganime.entity;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
@Table(name = "oder_history", schema = "datn", catalog = "")
public class OderHistoryEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;
    @Basic
    @Column(name = "ten")
    private String ten;
    @Basic
    @Column(name = "mo_ta")
    private String moTa;
    @Basic
    @Column(name = "kieu_trang_thai")
    private int kieuTrangThai;
    @Basic
    @Column(name = "ngay_tao")
    private Timestamp ngayTao;
    @Basic
    @Column(name = "id_status")
    private int idStatus;
    @Basic
    @Column(name = "id_oder")
    private int idOder;
    @Basic
    @Column(name = "id_account")
    private int idAccount;

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

    public String getMoTa() {
        return moTa;
    }

    public void setMoTa(String moTa) {
        this.moTa = moTa;
    }

    public int getKieuTrangThai() {
        return kieuTrangThai;
    }

    public void setKieuTrangThai(int kieuTrangThai) {
        this.kieuTrangThai = kieuTrangThai;
    }

    public Timestamp getNgayTao() {
        return ngayTao;
    }

    public void setNgayTao(Timestamp ngayTao) {
        this.ngayTao = ngayTao;
    }

    public int getIdStatus() {
        return idStatus;
    }

    public void setIdStatus(int idStatus) {
        this.idStatus = idStatus;
    }

    public int getIdOder() {
        return idOder;
    }

    public void setIdOder(int idOder) {
        this.idOder = idOder;
    }

    public int getIdAccount() {
        return idAccount;
    }

    public void setIdAccount(int idAccount) {
        this.idAccount = idAccount;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        OderHistoryEntity that = (OderHistoryEntity) o;

        if (id != that.id) return false;
        if (kieuTrangThai != that.kieuTrangThai) return false;
        if (idStatus != that.idStatus) return false;
        if (idOder != that.idOder) return false;
        if (idAccount != that.idAccount) return false;
        if (ten != null ? !ten.equals(that.ten) : that.ten != null) return false;
        if (moTa != null ? !moTa.equals(that.moTa) : that.moTa != null) return false;
        if (ngayTao != null ? !ngayTao.equals(that.ngayTao) : that.ngayTao != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (ten != null ? ten.hashCode() : 0);
        result = 31 * result + (moTa != null ? moTa.hashCode() : 0);
        result = 31 * result + kieuTrangThai;
        result = 31 * result + (ngayTao != null ? ngayTao.hashCode() : 0);
        result = 31 * result + idStatus;
        result = 31 * result + idOder;
        result = 31 * result + idAccount;
        return result;
    }
}
