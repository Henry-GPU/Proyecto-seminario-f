package com.management.mysql.system.debt_assignmet;

import java.time.LocalDate;

public class DebtAssignmentResponse {
    private Integer idDeuda;
    private String nombreCliente;
    private Double monto;
    private LocalDate fechaDeuda;
    private String usuarioAsignado;
    private String canalCobranza;

    public Integer getIdDeuda() {
        return idDeuda;
    }
    public void setIdDeuda(Integer idDeuda) {
        this.idDeuda = idDeuda;
    }
    public String getNombreCliente() {
        return nombreCliente;
    }
    public void setNombreCliente(String nombreCliente) {
        this.nombreCliente = nombreCliente;
    }
    public Double getMonto() {
        return monto;
    }
    public void setMonto(Double monto) {
        this.monto = monto;
    }
    public LocalDate getFechaDeuda() {
        return fechaDeuda;
    }
    public void setFechaDeuda(LocalDate fechaDeuda) {
        this.fechaDeuda = fechaDeuda;
    }
    public String getUsuarioAsignado() {
        return usuarioAsignado;
    }
    public void setUsuarioAsignado(String usuarioAsignado) {
        this.usuarioAsignado = usuarioAsignado;
    }
    public String getCanalCobranza() {
        return canalCobranza;
    }
    public void setCanalCobranza(String canalCobranza) {
        this.canalCobranza = canalCobranza;
    }

}
