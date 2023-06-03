package com.example.datn_ganime.entity;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
@Table(name = "oder_detail", schema = "datn", catalog = "")
public class OderDetailEntity {
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
    @Column(name = "anh")
    private String anh;
    @Basic
    @Column(name = "mau")
    private String mau;
    @Basic
    @Column(name = "size")
    private String size;
    @Basic
    @Column(name = "chat_lieu")
    private String chatLieu;
    @Basic
    @Column(name = "trang_thai")
    private int trangThai;
    @Basic
    @Column(name = "gioi_tinh")
    private String gioiTinh;
    @Basic
    @Column(name = "create_at")
    private Timestamp createAt;
    @Basic
    @Column(name = "delete_at")
    private Timestamp deleteAt;
    @Basic
    @Column(name = "update_at")
    private Timestamp updateAt;
    @Basic
    @Column(name = "id_san_pham_chi_tiet")
    private int idSanPhamChiTiet;
    @Basic
    @Column(name = "id_oder")
    private int idOder;

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

    public String getAnh() {
        return anh;
    }

    public void setAnh(String anh) {
        this.anh = anh;
    }

    public String getMau() {
        return mau;
    }

    public void setMau(String mau) {
        this.mau = mau;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getChatLieu() {
        return chatLieu;
    }

    public void setChatLieu(String chatLieu) {
        this.chatLieu = chatLieu;
    }

    public int getTrangThai() {
        return trangThai;
    }

    public void setTrangThai(int trangThai) {
        this.trangThai = trangThai;
    }

    public String getGioiTinh() {
        return gioiTinh;
    }

    public void setGioiTinh(String gioiTinh) {
        this.gioiTinh = gioiTinh;
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

    public int getIdSanPhamChiTiet() {
        return idSanPhamChiTiet;
    }

    public void setIdSanPhamChiTiet(int idSanPhamChiTiet) {
        this.idSanPhamChiTiet = idSanPhamChiTiet;
    }

    public int getIdOder() {
        return idOder;
    }

    public void setIdOder(int idOder) {
        this.idOder = idOder;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        OderDetailEntity that = (OderDetailEntity) o;

        if (id != that.id) return false;
        if (Double.compare(that.gia, gia) != 0) return false;
        if (soLuong != that.soLuong) return false;
        if (trangThai != that.trangThai) return false;
        if (idSanPhamChiTiet != that.idSanPhamChiTiet) return false;
        if (idOder != that.idOder) return false;
        if (tenSanPham != null ? !tenSanPham.equals(that.tenSanPham) : that.tenSanPham != null) return false;
        if (anh != null ? !anh.equals(that.anh) : that.anh != null) return false;
        if (mau != null ? !mau.equals(that.mau) : that.mau != null) return false;
        if (size != null ? !size.equals(that.size) : that.size != null) return false;
        if (chatLieu != null ? !chatLieu.equals(that.chatLieu) : that.chatLieu != null) return false;
        if (gioiTinh != null ? !gioiTinh.equals(that.gioiTinh) : that.gioiTinh != null) return false;
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
        result = 31 * result + (tenSanPham != null ? tenSanPham.hashCode() : 0);
        temp = Double.doubleToLongBits(gia);
        result = 31 * result + (int) (temp ^ (temp >>> 32));
        result = 31 * result + soLuong;
        result = 31 * result + (anh != null ? anh.hashCode() : 0);
        result = 31 * result + (mau != null ? mau.hashCode() : 0);
        result = 31 * result + (size != null ? size.hashCode() : 0);
        result = 31 * result + (chatLieu != null ? chatLieu.hashCode() : 0);
        result = 31 * result + trangThai;
        result = 31 * result + (gioiTinh != null ? gioiTinh.hashCode() : 0);
        result = 31 * result + (createAt != null ? createAt.hashCode() : 0);
        result = 31 * result + (deleteAt != null ? deleteAt.hashCode() : 0);
        result = 31 * result + (updateAt != null ? updateAt.hashCode() : 0);
        result = 31 * result + idSanPhamChiTiet;
        result = 31 * result + idOder;
        return result;
    }
}
