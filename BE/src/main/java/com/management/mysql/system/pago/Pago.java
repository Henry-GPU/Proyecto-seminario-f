package com.management.mysql.system.pago;
import com.management.mysql.system.debt.Debt;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Date;

@Entity
public class Pago {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "idDeuda", referencedColumnName = "id")
    private Debt deuda;

    private Double monto;

    private LocalDate fechaPago;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Debt getDeuda() {
        return deuda;
    }

    public void setDeuda(Debt deuda) {
        this.deuda = deuda;
    }

    public Double getMonto() {
        return monto;
    }

    public void setMonto(Double monto) {
        this.monto = monto;
    }

    public LocalDate getFechaPago() {
        return fechaPago;
    }

    public void setFechaPago(LocalDate fechaPago) {
        this.fechaPago = fechaPago;
    }
}
