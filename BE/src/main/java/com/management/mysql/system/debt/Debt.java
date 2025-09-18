package com.management.mysql.system.debt;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

import java.sql.Date;
import java.time.LocalDate;

import com.management.mysql.system.customer.Customer;
import com.management.mysql.system.interes.Interes;

@Entity
public class Debt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String descripcion;

    @OneToOne
    @JoinColumn(name = "id_cliente", referencedColumnName = "id")
    private Customer customer;

    private Double montoInicial;

    private LocalDate fechaAsignacion;

    private Integer estado;

    private Integer noCuotas;

    @OneToOne
    @JoinColumn(name = "id_interes", referencedColumnName = "id")
    private Interes interes;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
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

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Interes getInteres() {
        return interes;
    }

    public void setInteres(Interes interes) {
        this.interes = interes;
    }

    public Integer getNoCuotas() {
        return noCuotas;
    }

    public void setNoCuotas(Integer noCuotas) {
        this.noCuotas = noCuotas;
    }

    public Double getMontoInicial() {
        return montoInicial;
    }

    public void setMontoInicial(Double montoInicial) {
        this.montoInicial = montoInicial;
    }
    
}
