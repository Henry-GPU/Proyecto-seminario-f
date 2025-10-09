package com.management.mysql.system.debt;

import java.time.LocalDate;

public class DebtResponse {
    private String cliente;
    private Double montoInicial;
    private Integer noCuotas;
    private LocalDate fechaAsignacion;
    private Integer estado;
    public String getCliente() {
        return cliente;
    }
    public void setCliente(String cliente) {
        this.cliente = cliente;
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
    public LocalDate getFechaAsignacion() {
        return fechaAsignacion;
    }
    public void setFechaAsignacion(LocalDate fechaAsignacion) {
        this.fechaAsignacion = fechaAsignacion;
    }
    public Integer getEstado() {
        return estado;
    }
    public void setEstado(Integer estado) {
        this.estado = estado;
    }

    
}
