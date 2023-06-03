package com.example.datn_ganime.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "account_role", schema = "datn", catalog = "")
public class AccountRoleEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;
    @Basic
    @Column(name = "id_role")
    private Integer idRole;
    @Basic
    @Column(name = "id_account")
    private Integer idAccount;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Integer getIdRole() {
        return idRole;
    }

    public void setIdRole(Integer idRole) {
        this.idRole = idRole;
    }

    public Integer getIdAccount() {
        return idAccount;
    }

    public void setIdAccount(Integer idAccount) {
        this.idAccount = idAccount;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        AccountRoleEntity that = (AccountRoleEntity) o;

        if (id != that.id) return false;
        if (idRole != null ? !idRole.equals(that.idRole) : that.idRole != null) return false;
        if (idAccount != null ? !idAccount.equals(that.idAccount) : that.idAccount != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (idRole != null ? idRole.hashCode() : 0);
        result = 31 * result + (idAccount != null ? idAccount.hashCode() : 0);
        return result;
    }
}
