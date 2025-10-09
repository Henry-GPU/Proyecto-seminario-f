package com.management.mysql.system.customer;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.management.mysql.system.cuota.Cuota;
import com.management.mysql.system.cuota.CuotaRepository;
import com.management.mysql.system.customer.dto.CustomerUpdateRequest;
import com.management.mysql.system.customer.dto.DistribucionMorasResponse;
import com.management.mysql.system.debt.Debt;
import com.management.mysql.system.debt.DebtRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class CustomerService {
  
  @Autowired
  private CustomerRepository customerRepository;
  @Autowired private CuotaRepository cuotaRepository;
  @Autowired private DebtRepository debtService;

  private class CustomerStatus {
    private static final int DELETED = 0;
    private static final int ACTIVE = 1;
    private static final int INACTIVE = 2;
  }


  @Transactional
  public Customer createCustomer(Customer customer) {
    return  customerRepository.save(customer);
  }

  public Integer getTotalConDeudas() {
    Integer count = 0;
    List<Customer> allCustomers = customerRepository.findAll();
    for(Customer c: allCustomers){
      Debt debt = debtService.findByCustomer_Id(c.getId());
      if(debt != null){
        count++;
      }
    }
    return count;
  }

  public List<Customer> getAllCustomers() {
    return customerRepository.findAll();
  }
  
  public Customer getCustomerById(Integer id){
    Customer customer = customerRepository.findById(id)
    .orElseThrow(()-> new EntityNotFoundException("El cliente con el id: [" + id + "] no existe." ));
    return customer;
  }

  public DistribucionMorasResponse getDistribucionMora(){
    DistribucionMorasResponse response = new DistribucionMorasResponse();

    response.setSolventes(0);
    response.setMorosos(0);
    response.setMorosisimos(0);
    response.setSinDeudas(0);

    List<Customer> allCustomers = customerRepository.findAll();
    for(Customer c: allCustomers){
      Debt debt = debtService.findByCustomer_Id(c.getId());
      if(debt != null){
        List<Cuota> cuotas = cuotaRepository.findByDeuda_id(debt.getId());
        int morasVencidas = 0;
        for(Cuota cuota : cuotas){
          if(cuota.getEstado() == 0 && cuota.getFechaProgramada().isBefore(java.time.LocalDate.now())){
            morasVencidas++;
          }
        }
        if(morasVencidas == 0){
          response.setSolventes(response.getSolventes() + 1);
        } else if (morasVencidas > 0 && morasVencidas <= 3) {
          response.setMorosos(response.getMorosos() + 1);
        } else if (morasVencidas > 3) {
          response.setMorosisimos(response.getMorosisimos() + 1);

      }
    } else {
        response.setSinDeudas(response.getSinDeudas() + 1);
      }  
  }
  return response;
}

  @Transactional
  public void softDelete(Integer customerId){
    Customer customer = customerRepository.findById(customerId)
      .orElseThrow(() -> new EntityNotFoundException("El cliente con el id " + customerId + " no existe."));
    if (customer.getStatus() ==   CustomerStatus.DELETED) {
      throw new EntityNotFoundException("El cliente ya fue eliminado.");
    }
    customer.setStatus(CustomerStatus.DELETED);
    customerRepository.save(customer);
  }

  @Transactional
  public void desactivateCustomer(Integer customerId){
    Customer customer = customerRepository.findById(customerId)
      .orElseThrow(() -> new EntityNotFoundException("El cliente con el id " + customerId + " no existe."));

    if (customer.getStatus() == CustomerStatus.INACTIVE) {
      throw new IllegalArgumentException("El cliente ya fue desactivado.");
    }

    customer.setStatus(CustomerStatus.INACTIVE);
    customerRepository.save(customer);
  }

  @Transactional
  public void activateCustomer(Integer customerId){
    Customer customer = customerRepository.findById(customerId)
      .orElseThrow(() -> new EntityNotFoundException("El cliente con el id " + customerId + " no existe."));

    if (customer.getStatus() == CustomerStatus.ACTIVE) {
      throw new IllegalArgumentException("El cliente ya está activo.");        
    }

    customer.setStatus(CustomerStatus.ACTIVE);
    customerRepository.save(customer);
  }

  @Transactional
  public Customer updateCustomer(CustomerUpdateRequest customerUpdateRequest){
    Customer customer = customerRepository.findById(customerUpdateRequest.getId())
    .orElseThrow(()-> new EntityNotFoundException("El cliente con el id: [" + customerUpdateRequest.getId() + "] no existe." ));

    customer.setId(customerUpdateRequest.getId());
    customer.setNombres(customerUpdateRequest.getNombres());
    customer.setApellidos(customerUpdateRequest.getApellidos());
    customer.setNit(customerUpdateRequest.getNit());
    customer.setTelefono(customerUpdateRequest.getTelefono());
    customer.setEmail(customerUpdateRequest.getEmail());
    customer.setDireccion(customerUpdateRequest.getDireccion());
    customer.setZona(customerUpdateRequest.getZona());
    customer.setCiudad(customerUpdateRequest.getCiudad());
    customer.setDepartamento(customerUpdateRequest.getDepartamento());
    customer.setStatus(CustomerStatus.ACTIVE);

    return customerRepository.save(customer);

  }

}
