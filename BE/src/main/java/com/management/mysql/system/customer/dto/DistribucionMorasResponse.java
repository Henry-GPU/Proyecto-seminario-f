package com.management.mysql.system.customer.dto;

public class DistribucionMorasResponse {
    private Integer morosos;
    private Integer solventes;
    private Integer morosisimos;
    private Integer sinDeudas;

    
    public Integer getMorosos() {
        return morosos;
    }
    public void setMorosos(Integer morosos) {
        this.morosos = morosos;
    }
    public Integer getSolventes() {
        return solventes;
    }
    public void setSolventes(Integer solventes) {
        this.solventes = solventes;
    }
    public Integer getMorosisimos() {
        return morosisimos;
    }
    public void setMorosisimos(Integer morosisimos) {
        this.morosisimos = morosisimos;
    }
    public Integer getSinDeudas() {
        return sinDeudas;
    }
    public void setSinDeudas(Integer sinDeudas) {
        this.sinDeudas = sinDeudas;
    }

    
}
