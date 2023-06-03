package com.example.datn_ganime.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "image", schema = "datn", catalog = "")
public class ImageEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;
    @Basic
    @Column(name = "photo")
    private String photo;
    @Basic
    @Column(name = "trang_thai")
    private String trangThai;
    @Basic
    @Column(name = "isdefault")
    private Byte isdefault;
    @Basic
    @Column(name = "id_san_pham")
    private Integer idSanPham;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public String getTrangThai() {
        return trangThai;
    }

    public void setTrangThai(String trangThai) {
        this.trangThai = trangThai;
    }

    public Byte getIsdefault() {
        return isdefault;
    }

    public void setIsdefault(Byte isdefault) {
        this.isdefault = isdefault;
    }

    public Integer getIdSanPham() {
        return idSanPham;
    }

    public void setIdSanPham(Integer idSanPham) {
        this.idSanPham = idSanPham;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ImageEntity that = (ImageEntity) o;

        if (id != that.id) return false;
        if (photo != null ? !photo.equals(that.photo) : that.photo != null) return false;
        if (trangThai != null ? !trangThai.equals(that.trangThai) : that.trangThai != null) return false;
        if (isdefault != null ? !isdefault.equals(that.isdefault) : that.isdefault != null) return false;
        if (idSanPham != null ? !idSanPham.equals(that.idSanPham) : that.idSanPham != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (photo != null ? photo.hashCode() : 0);
        result = 31 * result + (trangThai != null ? trangThai.hashCode() : 0);
        result = 31 * result + (isdefault != null ? isdefault.hashCode() : 0);
        result = 31 * result + (idSanPham != null ? idSanPham.hashCode() : 0);
        return result;
    }
}
