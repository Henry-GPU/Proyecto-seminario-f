package com.management.mysql.system.cuota;

import java.util.List;

public class CuotasPendientesResponse {
    private  List<CuotaResponse> cuotas;

    public List<CuotaResponse> getCuotas() {
        return cuotas;
    }

    public void setCuotas(List<CuotaResponse> cuotas) {
        this.cuotas = cuotas;
    }
}
