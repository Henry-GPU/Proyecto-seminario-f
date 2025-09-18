package com.management.mysql.system.customer.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public class CustomerUpdateRequest {

  private Integer id_cliente;

  @NotBlank(message="El nombre es obligatorio.")
  private String nombres;

  @NotBlank(message = "Loa apellidos son obligatorios.")
  private String apellidos;

  @NotBlank(message = "El NIT es obligatorio.")
  @Pattern(regexp = "^[0-9]{8,13}$", message = "El NIT debe contener solo dígitos y tener entre 8 y 13 dígitos.")
  private String nit;

  @NotBlank(message = "El número de teléfono es obligatorio.")
  @Pattern(regexp = "^[0-9]{8,8}$", message = "El número de teléfono debe contener solo dígitos y tener 8 dígitos.")
  private String telefono;

  @NotBlank(message = "El correo electrónico es obligatorio.")
  @Email(message = "El correo electrónico no es válido.")
  private String email;

  private String direccion;
  private String zona;
  private String ciudad;
  private String departamento;

  public Integer getId() {
    return id_cliente;
  }
  public void setId(Integer id_cliente) {
    this.id_cliente = id_cliente;
  }
  public String getNombres() {
    return nombres;
  }
  public void setNombres(String nombres) {
    this.nombres = nombres;
  }
  public String getApellidos() {
    return apellidos;
  }
  public void setApellidos(String apellidos) {
    this.apellidos = apellidos;
  }
  public String getNit() {
    return nit;
  }
  public void setNit(String nit) {
    this.nit = nit;
  }
  public String getTelefono() {
    return telefono;
  }
  public void setTelefono(String telefono) {
    this.telefono = telefono;
  }
  public String getEmail() {
    return email;
  }
  public void setEmail(String email) {
    this.email = email;
  }
  public String getDireccion() {
    return direccion;
  }
  public void setDireccion(String direccion) {
    this.direccion = direccion;
  }
  public String getZona() {
    return zona;
  }
  public void setZona(String zona) {
    this.zona = zona;
  }
  public String getCiudad() {
    return ciudad;
  }
  public void setCiudad(String ciudad) {
    this.ciudad = ciudad;
  }
  public String getDepartamento() {
    return departamento;
  }
  public void setDepartamento(String departamento) {
    this.departamento = departamento;
  }


}
