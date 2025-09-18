package com.management.mysql.system.cuota;

import com.management.mysql.system.debt.Debt;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;

@Entity
public class Cuota {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id_deuda", referencedColumnName = "id")
    private Debt deuda;
    private Double monto;
    private LocalDate fechaProgramada;
    private Double mora;
    private Integer estado;
    private Integer noCuota;

    public void setFechaProgramada(LocalDate fechaProgramada) {
        this.fechaProgramada = fechaProgramada;
    }

    public Integer getNoCuota() {
        return noCuota;
    }

    public void setNoCuota(Integer noCuota) {
        this.noCuota = noCuota;
    }

    public Double getMora() { return mora; }
    public void setMora(Double mora) { this.mora = mora; }
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public Double getMonto() {
        return monto;
    }
    public void setMonto(Double monto) {
        this.monto = monto;
    }
    public LocalDate getFechaProgramada() {
        return fechaProgramada;
    }
    public void setFechaPago(LocalDate fechaProgramada) {
        this.fechaProgramada = fechaProgramada;
    }
    public Integer getEstado() {
        return estado;
    }
    public void setEstado(Integer estado) {
        this.estado = estado;
    }
    public Debt getDeuda() {
        return deuda;
    }
    public void setDeuda(Debt deuda) {
        this.deuda = deuda;
    }
    
}
