package com.management.mysql.system.debt;

import java.time.LocalDate;

public class DebtCreateRequest {
    private Integer idCliente;
    private Double montoInicial;
    private Integer noCuotas;
    private Integer idInteres;
    private String descripcion;
    private LocalDate fechaAsignacion;

    public LocalDate getFechaAsignacion() {
        return fechaAsignacion;
    }

    public void setFechaAsignacion(LocalDate fechaAsignacion) {
        this.fechaAsignacion = fechaAsignacion;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Integer getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(Integer idCliente) {
        this.idCliente = idCliente;
    }

    public Integer getIdInteres() {
        return idInteres;
    }

    public void setIdInteres(Integer idInteres) {
        this.idInteres = idInteres;
    }

    public Double getMontoInicial() {
        return montoInicial;
    }

    public void setMontoInicial(Double montoInicial) {
        this.montoInicial = montoInicial;
    }
    
    public Integer getNoCuotas() {
        return noCuotas;
    }
    public void setNoCuotas(Integer noCuotas) {
        this.noCuotas = noCuotas;
    }
}
