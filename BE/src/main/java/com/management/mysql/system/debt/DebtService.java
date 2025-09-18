package com.management.mysql.system.debt;

import com.management.mysql.system.cuota.Cuota;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.management.mysql.system.customer.CustomerRepository;
import com.management.mysql.system.interes.InteresRepository;
import com.management.mysql.system.cuota.CuotaRepository;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class DebtService {

    @Autowired
    private DebtRepository debtRepository;

    @Autowired CustomerRepository customerRepository;

    @Autowired InteresRepository interesRepository;
    @Autowired CuotaRepository cuotaRepository;

    public Debt createDebt(DebtCreateRequest request) {
        Debt debt = new Debt();
        if(!customerRepository.findById(request.getIdCliente()).isPresent()){
            throw new IllegalArgumentException("El cliente con el id: [" + request.getIdCliente() + "] no existe." );
        }
        if(!interesRepository.findById(request.getIdInteres()).isPresent()){
            throw new IllegalArgumentException("El interes con el id: [" + request.getIdInteres() + "] no existe." );
        }

        debt.setDescripcion(request.getDescripcion());
        debt.setCustomer(customerRepository.findById(request.getIdCliente()).orElse(null));
        debt.setMontoInicial(request.getMontoInicial());
        debt.setInteres(interesRepository.findById(request.getIdInteres()).orElse(null));
        debt.setNoCuotas(request.getNoCuotas());
        debt.setFechaAsignacion(request.getFechaAsignacion());
        debt.setEstado(1);

        debtRepository.save(debt);
        Double montoCuota = (debt.getMontoInicial() + (debt.getMontoInicial() * (debt.getInteres().getPorcentaje()/100)))/debt.getNoCuotas();
        montoCuota = Math.round(montoCuota * 100.0) / 100.0;
        LocalDate fechaCuota = debt.getFechaAsignacion();
        for (int i = 0; i< request.getNoCuotas(); i++) {
            fechaCuota = fechaCuota.plusMonths(1);
            Cuota cuota = new Cuota();
            cuota.setDeuda(debt);
            cuota.setFechaPago(fechaCuota);
            cuota.setMonto(montoCuota);
            cuota.setMora(0.00);
            cuota.setEstado(0);
            cuota.setNoCuota(i+1);
            cuotaRepository.save(cuota);
        }
        return debt;
    }

    public List<DebtResponse> getAllDebts() {
        DebtResponse debtResponse = new DebtResponse();
        List<DebtResponse> debtResponses = new ArrayList<>();
        List<Debt> debts = debtRepository.findAll();
        for (Debt debt : debts) {
            debtResponse.setCliente(debt.getCustomer().getNombres() + " " + debt.getCustomer().getApellidos());
            debtResponse.setMontoInicial(debt.getMontoInicial());
            debtResponse.setNoCuotas(debt.getNoCuotas());
            debtResponse.setFechaAsignacion(debt.getFechaAsignacion());
            debtResponse.setEstado(debt.getEstado());
            debtResponses.add(debtResponse);
        }
        return debtResponses;
    }

    public Double getTotalAllDebts() {
        return debtRepository.sumaTotal();
    }

    public Integer getTotalDebts() {
        return debtRepository.findAll().size();
    }

    public Debt getDebtById(Integer id) {
        return debtRepository.findById(id).orElse(null);
    }

}
