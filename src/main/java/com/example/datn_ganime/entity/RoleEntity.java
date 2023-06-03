package com.example.datn_ganime.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "role", schema = "datn", catalog = "")
public class RoleEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;
    @Basic
    @Column(name = "ten_role")
    private String tenRole;
    @Basic
    @Column(name = "trang-thai")
    private int trangThai;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTenRole() {
        return tenRole;
    }

    public void setTenRole(String tenRole) {
        this.tenRole = tenRole;
    }

    public int getTrangThai() {
        return trangThai;
    }

    public void setTrangThai(int trangThai) {
        this.trangThai = trangThai;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        RoleEntity that = (RoleEntity) o;

        if (id != that.id) return false;
        if (trangThai != that.trangThai) return false;
        if (tenRole != null ? !tenRole.equals(that.tenRole) : that.tenRole != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (tenRole != null ? tenRole.hashCode() : 0);
        result = 31 * result + trangThai;
        return result;
    }
}
