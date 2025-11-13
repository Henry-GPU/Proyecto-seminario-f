package com.management.mysql.system.pago;

import com.management.mysql.system.cuota.Cuota;
import com.management.mysql.system.cuota.CuotaRepository;
import com.management.mysql.system.customer.CustomerRepository;
import com.management.mysql.system.debt.Debt;
import com.management.mysql.system.debt.DebtRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Service
public class PagoService {
    @Autowired PagoRepository pagoRepository;
    @Autowired CustomerRepository customerRepository;
    @Autowired DebtRepository debtRepository;
    @Autowired CuotaRepository cuotaRepository;

    public Integer getAllPagosRegistrados(){
        return pagoRepository.findAll().size();
    }

    public String getCuotaVencida(Integer idCliente){
        if(customerRepository.findById(idCliente).isEmpty()){
            throw new RuntimeException("No se encontró el cliente con el id: " + idCliente);
        }
        if(debtRepository.findByCustomer_Id(idCliente) == null){
            return "El cliente no tiene deudas activas.";
        }
        Debt debt = debtRepository.findByCustomer_Id(idCliente);
        Long cantCuotasVencidas = cuotaRepository.countByFechaProgramadaLessThanAndEstadoAndDeuda_id(LocalDate.now().minusMonths(1).minusDays(1),0, debt.getId());
        if (cantCuotasVencidas > 0){
            return  "El cliente tiene un total de: " + cantCuotasVencidas + " cuotas vencidas.";
        }
        return "El cliente está solvente.";
    }
    public String registrarPago(PagoCuotaRequest request){
        if(customerRepository.findById(request.getIdCliente()).isEmpty()){
            throw new RuntimeException("No se encontró el cliente con el id: " + request.getIdCliente());
        }if(debtRepository.findByCustomer_Id(request.getIdCliente()) == null){
            throw new RuntimeException("El cliente no tiene deudas activas.");
        }
        Debt deuda = debtRepository.findByCustomer_Id(request.getIdCliente());
        Cuota cuotaPorPagar = cuotaRepository.findFirstByDeuda_idAndEstadoOrderByFechaProgramadaAsc(deuda.getId(), 0);
        LocalDate fechaPorPagar = cuotaPorPagar.getFechaProgramada();


        Pago pago = new Pago();
        pago.setMonto(cuotaPorPagar.getMonto());
        pago.setDeuda(deuda);
        pago.setFechaPago(LocalDate.now());
        pagoRepository.save(pago);

        Long diasAtraso = ChronoUnit.DAYS.between(fechaPorPagar, LocalDate.now());
        if(diasAtraso > 2){
            Double mora = diasAtraso * (cuotaPorPagar.getMonto()) * 0.0001;
            mora = Math.round(mora * 100.0) / 100.0;
            cuotaPorPagar.setMora(mora);
        }
        cuotaPorPagar.setEstado(1);
        cuotaRepository.save(cuotaPorPagar);
        return "Pago registrado.";
    }
}
