package com.management.mysql.system.cuota;

import java.time.LocalDate;

public class CuotaResponse {
    private Integer idDeuda;
    private Double monto;
    private Double mora;
    private LocalDate fechaProgramada;
    private Integer estado;
    private Integer noCuota;

    public Integer getNoCuota() {
        return noCuota;
    }

    public void setNoCuota(Integer noCuota) {
        this.noCuota = noCuota;
    }

    public Integer getIdDeuda() {
        return idDeuda;
    }

    public void setIdDeuda(Integer idDeuda) {
        this.idDeuda = idDeuda;
    }

    public Double getMonto() {
        return monto;
    }

    public void setMonto(Double monto) {
        this.monto = monto;
    }

    public Double getMora() {
        return mora;
    }

    public void setMora(Double mora) {
        this.mora = mora;
    }

    public LocalDate getFechaProgramada() {
        return fechaProgramada;
    }

    public void setFechaProgramada(LocalDate fechaProgramada) {
        this.fechaProgramada = fechaProgramada;
    }

    public Integer getEstado() {
        return estado;
    }

    public void setEstado(Integer estado) {
        this.estado = estado;
    }
}
