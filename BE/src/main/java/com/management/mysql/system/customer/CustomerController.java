package com.management.mysql.system.customer;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.management.mysql.system.customer.dto.CustomerCreateRequest;
import com.management.mysql.system.customer.dto.CustomerUpdateRequest;
import com.management.mysql.system.customer.dto.DistribucionMorasResponse;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;




@RestController
@RequestMapping("api/customers")
public class CustomerController {

  @Autowired
  private CustomerService customerService;

  @PostMapping("/create")
  public ResponseEntity<?> createCustomer(@RequestBody @Valid CustomerCreateRequest customerRequest) {
    Customer customer = new Customer();
    customer.setNombres(customerRequest.getNombres());
    customer.setApellidos(customerRequest.getApellidos());
    customer.setNit(customerRequest.getNit());
    customer.setTelefono(customerRequest.getTelefono());
    customer.setEmail(customerRequest.getEmail());
    customer.setDireccion(customerRequest.getDireccion());
    customer.setZona(customerRequest.getZona());
    customer.setCiudad(customerRequest.getCiudad());
    customer.setDepartamento(customerRequest.getDepartamento());
    customer.setStatus(1);

    try {
      customerService.createCustomer(customer);
      return ResponseEntity.status(HttpStatus.CREATED)
        .body("Cliente registrado con éxito.");
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
        .body("Algo salió mal al crear el cliente.");
    }
  }
  

  @GetMapping("/get")
  public List<Customer> getAllCustomers() {
      return customerService.getAllCustomers();
  }

  @GetMapping("/get/total")
  public ResponseEntity<?> getTotalCustomers() {
      try {
      return ResponseEntity.ok(customerService.getAllCustomers().size());
      } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al obtener el total de clientes.");
      }
  }

  @GetMapping("/get/total/con-deudas")
  public ResponseEntity<?> getTotalConDeudas() {
    try {
      return ResponseEntity.ok(customerService.getTotalConDeudas());
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al obtener el total de clientes con deudas.");
    }
  }
  

  @GetMapping("/{id}/get")
  public ResponseEntity<?> getCustomerById(@PathVariable Integer id) {
    try {
      Customer customer = customerService.getCustomerById(id);
      return ResponseEntity.ok(customer);
    } catch (EntityNotFoundException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cliente no encontrado.");
    }
  }

  @GetMapping("/get/distribucion-mora")
  public ResponseEntity<?> getDistribucionMora() {
        try {
      DistribucionMorasResponse dist = customerService.getDistribucionMora();
      return ResponseEntity.ok(dist);
    } catch (EntityNotFoundException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cliente no encontrado.");
    }
  }
  

  @PatchMapping("/update")
  public ResponseEntity<?> updateCustomer(@RequestBody @Valid CustomerUpdateRequest customerUpdateRequest){
    try {
      customerService.updateCustomer(customerUpdateRequest);
      return ResponseEntity.ok("Cliente actualizado correctamente.");
    } catch (EntityNotFoundException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cliente no encontrado.");
    }
  }

  @DeleteMapping("/{id}/delete")
  public ResponseEntity<?> softDelete(@PathVariable Integer id){
    try {
      customerService.softDelete(id);
      return ResponseEntity.ok("Cliente correctamente eliminado.");
    } catch (EntityNotFoundException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("El cliente no existe o ya fue eliminado previamente.");
    }
  }

  @PatchMapping("/{id}/desactivate")
  public ResponseEntity<?> desactivateCustomer(@PathVariable Integer id){
    try {
      customerService.desactivateCustomer(id);
      return ResponseEntity.ok("Cliente correctamente desactivado.");
    } catch (EntityNotFoundException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("El cliente no existe.");
    } catch (IllegalArgumentException e){
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El cliente ya está desactivado.");
    }
  }

  @PatchMapping("/{id}/activate")
  public ResponseEntity<?> activateCustomer(@PathVariable Integer id){
    try {
      customerService.activateCustomer(id);
      return ResponseEntity.ok("Cliente correctamente activado.");
    } catch (EntityNotFoundException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("El cliente no existe.");
    } catch (IllegalArgumentException e){
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El cliente ya está activado.");
    }
  }
 
}
