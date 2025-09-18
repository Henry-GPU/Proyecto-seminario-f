package com.management.mysql.system.interes;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Interes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Double porcentaje;
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public Double getPorcentaje() {
        return porcentaje;
    }
    public void setPorcentaje(Double porcentaje) {
        this.porcentaje = porcentaje;
    }
}
