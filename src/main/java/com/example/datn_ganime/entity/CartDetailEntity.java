package com.example.datn_ganime.entity;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
@Table(name = "cart_detail", schema = "datn", catalog = "")
public class CartDetailEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;
    @Basic
    @Column(name = "ten_san_pham")
    private String tenSanPham;
    @Basic
    @Column(name = "gia")
    private Double gia;
    @Basic
    @Column(name = "so_luong")
    private Integer soLuong;
    @Basic
    @Column(name = "ngay_tao")
    private Timestamp ngayTao;
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
    @Column(name = "trang-thai")
    private Integer trangThai;
    @Basic
    @Column(name = "id_khach_hang")
    private Integer idKhachHang;
    @Basic
    @Column(name = "id_san_pham_chi_tiet")
    private Integer idSanPhamChiTiet;

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

    public Double getGia() {
        return gia;
    }

    public void setGia(Double gia) {
        this.gia = gia;
    }

    public Integer getSoLuong() {
        return soLuong;
    }

    public void setSoLuong(Integer soLuong) {
        this.soLuong = soLuong;
    }

    public Timestamp getNgayTao() {
        return ngayTao;
    }

    public void setNgayTao(Timestamp ngayTao) {
        this.ngayTao = ngayTao;
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

    public Integer getTrangThai() {
        return trangThai;
    }

    public void setTrangThai(Integer trangThai) {
        this.trangThai = trangThai;
    }

    public Integer getIdKhachHang() {
        return idKhachHang;
    }

    public void setIdKhachHang(Integer idKhachHang) {
        this.idKhachHang = idKhachHang;
    }

    public Integer getIdSanPhamChiTiet() {
        return idSanPhamChiTiet;
    }

    public void setIdSanPhamChiTiet(Integer idSanPhamChiTiet) {
        this.idSanPhamChiTiet = idSanPhamChiTiet;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        CartDetailEntity that = (CartDetailEntity) o;

        if (id != that.id) return false;
        if (tenSanPham != null ? !tenSanPham.equals(that.tenSanPham) : that.tenSanPham != null) return false;
        if (gia != null ? !gia.equals(that.gia) : that.gia != null) return false;
        if (soLuong != null ? !soLuong.equals(that.soLuong) : that.soLuong != null) return false;
        if (ngayTao != null ? !ngayTao.equals(that.ngayTao) : that.ngayTao != null) return false;
        if (anh != null ? !anh.equals(that.anh) : that.anh != null) return false;
        if (mau != null ? !mau.equals(that.mau) : that.mau != null) return false;
        if (size != null ? !size.equals(that.size) : that.size != null) return false;
        if (trangThai != null ? !trangThai.equals(that.trangThai) : that.trangThai != null) return false;
        if (idKhachHang != null ? !idKhachHang.equals(that.idKhachHang) : that.idKhachHang != null) return false;
        if (idSanPhamChiTiet != null ? !idSanPhamChiTiet.equals(that.idSanPhamChiTiet) : that.idSanPhamChiTiet != null)
            return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (tenSanPham != null ? tenSanPham.hashCode() : 0);
        result = 31 * result + (gia != null ? gia.hashCode() : 0);
        result = 31 * result + (soLuong != null ? soLuong.hashCode() : 0);
        result = 31 * result + (ngayTao != null ? ngayTao.hashCode() : 0);
        result = 31 * result + (anh != null ? anh.hashCode() : 0);
        result = 31 * result + (mau != null ? mau.hashCode() : 0);
        result = 31 * result + (size != null ? size.hashCode() : 0);
        result = 31 * result + (trangThai != null ? trangThai.hashCode() : 0);
        result = 31 * result + (idKhachHang != null ? idKhachHang.hashCode() : 0);
        result = 31 * result + (idSanPhamChiTiet != null ? idSanPhamChiTiet.hashCode() : 0);
        return result;
    }
}
