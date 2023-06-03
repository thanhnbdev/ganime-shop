package com.example.datn_ganime.entity;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
@Table(name = "oder", schema = "datn", catalog = "")
public class OderEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;
    @Basic
    @Column(name = "ten_nguoi_nhan")
    private String tenNguoiNhan;
    @Basic
    @Column(name = "sdt_nguoi_nhan")
    private Integer sdtNguoiNhan;
    @Basic
    @Column(name = "dia_chi_nguoi_nhan")
    private String diaChiNguoiNhan;
    @Basic
    @Column(name = "ngay_ship")
    private Timestamp ngayShip;
    @Basic
    @Column(name = "ngay_nhan")
    private Timestamp ngayNhan;
    @Basic
    @Column(name = "ghi_chu")
    private String ghiChu;
    @Basic
    @Column(name = "giá_ship")
    private double giáShip;
    @Basic
    @Column(name = "tong_tien")
    private double tongTien;
    @Basic
    @Column(name = "tien_khuyen_mai")
    private double tienKhuyenMai;
    @Basic
    @Column(name = "tien_thanh_toan")
    private double tienThanhToan;
    @Basic
    @Column(name = "ten_nguoi_tao")
    private String tenNguoiTao;
    @Basic
    @Column(name = "kieu_hoa_don")
    private int kieuHoaDon;
    @Basic
    @Column(name = "id_khach_hang")
    private int idKhachHang;
    @Basic
    @Column(name = "id_account")
    private int idAccount;
    @Basic
    @Column(name = "id_vocher")
    private int idVocher;
    @Basic
    @Column(name = "is_status")
    private int isStatus;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTenNguoiNhan() {
        return tenNguoiNhan;
    }

    public void setTenNguoiNhan(String tenNguoiNhan) {
        this.tenNguoiNhan = tenNguoiNhan;
    }

    public Integer getSdtNguoiNhan() {
        return sdtNguoiNhan;
    }

    public void setSdtNguoiNhan(Integer sdtNguoiNhan) {
        this.sdtNguoiNhan = sdtNguoiNhan;
    }

    public String getDiaChiNguoiNhan() {
        return diaChiNguoiNhan;
    }

    public void setDiaChiNguoiNhan(String diaChiNguoiNhan) {
        this.diaChiNguoiNhan = diaChiNguoiNhan;
    }

    public Timestamp getNgayShip() {
        return ngayShip;
    }

    public void setNgayShip(Timestamp ngayShip) {
        this.ngayShip = ngayShip;
    }

    public Timestamp getNgayNhan() {
        return ngayNhan;
    }

    public void setNgayNhan(Timestamp ngayNhan) {
        this.ngayNhan = ngayNhan;
    }

    public String getGhiChu() {
        return ghiChu;
    }

    public void setGhiChu(String ghiChu) {
        this.ghiChu = ghiChu;
    }

    public double getGiáShip() {
        return giáShip;
    }

    public void setGiáShip(double giáShip) {
        this.giáShip = giáShip;
    }

    public double getTongTien() {
        return tongTien;
    }

    public void setTongTien(double tongTien) {
        this.tongTien = tongTien;
    }

    public double getTienKhuyenMai() {
        return tienKhuyenMai;
    }

    public void setTienKhuyenMai(double tienKhuyenMai) {
        this.tienKhuyenMai = tienKhuyenMai;
    }

    public double getTienThanhToan() {
        return tienThanhToan;
    }

    public void setTienThanhToan(double tienThanhToan) {
        this.tienThanhToan = tienThanhToan;
    }

    public String getTenNguoiTao() {
        return tenNguoiTao;
    }

    public void setTenNguoiTao(String tenNguoiTao) {
        this.tenNguoiTao = tenNguoiTao;
    }

    public int getKieuHoaDon() {
        return kieuHoaDon;
    }

    public void setKieuHoaDon(int kieuHoaDon) {
        this.kieuHoaDon = kieuHoaDon;
    }

    public int getIdKhachHang() {
        return idKhachHang;
    }

    public void setIdKhachHang(int idKhachHang) {
        this.idKhachHang = idKhachHang;
    }

    public int getIdAccount() {
        return idAccount;
    }

    public void setIdAccount(int idAccount) {
        this.idAccount = idAccount;
    }

    public int getIdVocher() {
        return idVocher;
    }

    public void setIdVocher(int idVocher) {
        this.idVocher = idVocher;
    }

    public int getIsStatus() {
        return isStatus;
    }

    public void setIsStatus(int isStatus) {
        this.isStatus = isStatus;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        OderEntity that = (OderEntity) o;

        if (id != that.id) return false;
        if (Double.compare(that.giáShip, giáShip) != 0) return false;
        if (Double.compare(that.tongTien, tongTien) != 0) return false;
        if (Double.compare(that.tienKhuyenMai, tienKhuyenMai) != 0) return false;
        if (Double.compare(that.tienThanhToan, tienThanhToan) != 0) return false;
        if (kieuHoaDon != that.kieuHoaDon) return false;
        if (idKhachHang != that.idKhachHang) return false;
        if (idAccount != that.idAccount) return false;
        if (idVocher != that.idVocher) return false;
        if (isStatus != that.isStatus) return false;
        if (tenNguoiNhan != null ? !tenNguoiNhan.equals(that.tenNguoiNhan) : that.tenNguoiNhan != null) return false;
        if (sdtNguoiNhan != null ? !sdtNguoiNhan.equals(that.sdtNguoiNhan) : that.sdtNguoiNhan != null) return false;
        if (diaChiNguoiNhan != null ? !diaChiNguoiNhan.equals(that.diaChiNguoiNhan) : that.diaChiNguoiNhan != null)
            return false;
        if (ngayShip != null ? !ngayShip.equals(that.ngayShip) : that.ngayShip != null) return false;
        if (ngayNhan != null ? !ngayNhan.equals(that.ngayNhan) : that.ngayNhan != null) return false;
        if (ghiChu != null ? !ghiChu.equals(that.ghiChu) : that.ghiChu != null) return false;
        if (tenNguoiTao != null ? !tenNguoiTao.equals(that.tenNguoiTao) : that.tenNguoiTao != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result;
        long temp;
        result = id;
        result = 31 * result + (tenNguoiNhan != null ? tenNguoiNhan.hashCode() : 0);
        result = 31 * result + (sdtNguoiNhan != null ? sdtNguoiNhan.hashCode() : 0);
        result = 31 * result + (diaChiNguoiNhan != null ? diaChiNguoiNhan.hashCode() : 0);
        result = 31 * result + (ngayShip != null ? ngayShip.hashCode() : 0);
        result = 31 * result + (ngayNhan != null ? ngayNhan.hashCode() : 0);
        result = 31 * result + (ghiChu != null ? ghiChu.hashCode() : 0);
        temp = Double.doubleToLongBits(giáShip);
        result = 31 * result + (int) (temp ^ (temp >>> 32));
        temp = Double.doubleToLongBits(tongTien);
        result = 31 * result + (int) (temp ^ (temp >>> 32));
        temp = Double.doubleToLongBits(tienKhuyenMai);
        result = 31 * result + (int) (temp ^ (temp >>> 32));
        temp = Double.doubleToLongBits(tienThanhToan);
        result = 31 * result + (int) (temp ^ (temp >>> 32));
        result = 31 * result + (tenNguoiTao != null ? tenNguoiTao.hashCode() : 0);
        result = 31 * result + kieuHoaDon;
        result = 31 * result + idKhachHang;
        result = 31 * result + idAccount;
        result = 31 * result + idVocher;
        result = 31 * result + isStatus;
        return result;
    }
}
