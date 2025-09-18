package com.management.mysql.system.customer;


import com.management.mysql.system.audit.AuditEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
@EntityListeners(AuditEntityListener.class)
public class Customer {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;
  @Column(nullable = false)
  private String nombres;
  @Column(nullable = false)
  private String apellidos;
  @Column(nullable = false)
  private String nit;
  private String telefono;
  private String email;
  private String direccion;
  private String zona;
  private String ciudad;
  private String departamento;
  private Integer status;


  public String getEmail() {
    return email;
  }
  public void setEmail(String email) {
    this.email = email;
  }
  public String getNit() {
    return nit;
  }
  public void setNit(String nit) {
    this.nit = nit;
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
  public String getTelefono() {
    return telefono;
  }
  public void setTelefono(String telefono) {
    this.telefono = telefono;
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
  public Integer getStatus() {
    return status;
  }
  public void setStatus(Integer status) {
    this.status = status;
  }
  public Integer getId() {
    return id;
  }
  public void setId(Integer id) {
    this.id = id;
  }

 
}
