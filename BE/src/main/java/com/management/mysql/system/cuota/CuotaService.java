package com.management.mysql.system.cuota;

import com.management.mysql.system.customer.CustomerRepository;
import com.management.mysql.system.debt.Debt;
import com.management.mysql.system.debt.DebtRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Service
public class CuotaService {
    @Autowired
    CustomerRepository customerRepository;
    @Autowired CuotaRepository cuotaRepository;
    @Autowired
    DebtRepository debtRepository;
    public List<CuotaResponse> cuotasPorPagarPorCliente(Integer id){
        if(customerRepository.findById(id).isEmpty()){
            new RuntimeException("El cliente con el id: " + id + " no existe.");
        }
        Debt debt = debtRepository.findByCustomer_Id(id);
        if(debt.getId() == null){
            new RuntimeException("El cliente con el id: " + id + " no tiene deudas.");
        }
        List<Cuota> cuotasPendientes = cuotaRepository.findAllByDeuda_idAndEstado(debt.getId(), 0);
        List<CuotaResponse> cuotasPendientesResponse = new ArrayList<>();
        for(Cuota c : cuotasPendientes){
            CuotaResponse cr = new CuotaResponse();
            LocalDate fechaPorPagar = c.getFechaProgramada();
            Long diasAtraso = ChronoUnit.DAYS.between(fechaPorPagar, LocalDate.now());
            cr.setMora(c.getMora());
            if(diasAtraso > 2){
                Double mora = diasAtraso * (c.getMonto()) * 0.0001;
                mora = Math.round(mora * 100.0) / 100.0;
                cr.setMora(mora);
            }
            cr.setIdDeuda(c.getDeuda().getId());
            cr.setFechaProgramada(c.getFechaProgramada());
            cr.setMonto(c.getMonto());
            cr.setEstado(c.getEstado());
            cr.setNoCuota(c.getNoCuota());
            cuotasPendientesResponse.add(cr);
        }
        return cuotasPendientesResponse;
    }
}
