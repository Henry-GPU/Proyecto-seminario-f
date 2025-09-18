package com.management.mysql.system.debt_assignmet;

import com.management.mysql.system.collection.Collection;
import com.management.mysql.system.debt.Debt;
import com.management.mysql.system.user.User;

public class DebtAssignmentCreateRequest {
    private Integer idDeuda;
    private Integer idCobranza;
    private Integer idUsuario;
    private String descripcion;

    public Integer getIdDeuda() {
        return idDeuda;
    }

    public void setIdDeuda(Integer idDeuda) {
        this.idDeuda = idDeuda;
    }

    public Integer getIdCobranza() {
        return idCobranza;
    }

    public void setIdCobranza(Integer idCobranza) {
        this.idCobranza = idCobranza;
    }

    public Integer getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
}
