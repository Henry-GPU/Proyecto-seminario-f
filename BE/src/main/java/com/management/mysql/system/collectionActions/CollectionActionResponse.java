package com.management.mysql.system.collectionActions;

import java.time.LocalDateTime;

public class CollectionActionResponse {
    private String usuario;
    private LocalDateTime fecha;
    private String accion;
    private String cliente;
    private Integer idDeuda;

    public String getUsuario() {
        return usuario;
    }
    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }
    public LocalDateTime getFecha() {
        return fecha;
    }
    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }
    public String getAccion() {
        return accion;
    }
    public void setAccion(String accion) {
        this.accion = accion;
    }
    public String getCliente() {
        return cliente;
    }
    public void setCliente(String cliente) {
        this.cliente = cliente;
    }
    public Integer getIdDeuda() {
        return idDeuda;
    }
    public void setIdDeuda(Integer idDeuda) {
        this.idDeuda = idDeuda;
    }
    
    
}
