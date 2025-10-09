package com.management.mysql.system.mora;

import com.management.mysql.system.debt.Debt;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Mora {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Integer id;

    @ManyToOne
    @JoinColumn(name = "id_deuda", referencedColumnName = "id")
    private Debt debt;
    private Double monto;
    private LocalDate fechaInicio;
    private LocalDate fechaPago;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Debt getDebt() {
        return debt;
    }

    public void setDebt(Debt debt) {
        this.debt = debt;
    }

    public Double getMonto() {
        return monto;
    }

    public void setMonto(Double monto) {
        this.monto = monto;
    }

    public LocalDate getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(LocalDate fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public LocalDate getFechaPago() {
        return fechaPago;
    }

    public void setFechaPago(LocalDate fechaPago) {
        this.fechaPago = fechaPago;
    }
}
