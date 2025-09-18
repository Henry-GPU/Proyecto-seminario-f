package com.management.mysql.system.user.dto;

import java.util.UUID;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class UserUpdateRequest {
  private Integer id;

  @NotBlank(message = "El nombre de usuario es obligatorio.")
  @Pattern(regexp = "^[a-zA-Z]{8,20}$", message = "El nombre de usuario solo puede contener letras y tener de 8 a 20 caracteres.")

  private String username;

  @NotBlank(message = "El número de teléfono es obligatorio.")
  @Pattern(regexp = "^[0-9]{8,8}$", message = "El número de teléfono debe contener solo dígitos y tener 8 dígitos.")
  private String phone;

  @Pattern(
    regexp = "^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$",
    message = "El correo electrónico no es válido. Debe tener el formato: nombre@email.com"
  )
  @NotBlank(message = "El correo electrónico es obligatorio.")
  private String email;

  @NotBlank(message = "El nombre es obligatorio.")
  private String fullName;
  
  public String getUsername() {
    return username;
  }
  public void setUsername(String username) {
    this.username = username;
  }
  public String getPhone() {
    return phone;
  }
  public void setPhone(String phone) {
    this.phone = phone;
  }
  public String getEmail() {
    return email;
  }
  public void setEmail(String email) {
    this.email = email;
  }
  public String getFullName() {
    return fullName;
  }
  public void setFullName(String fullName) {
    this.fullName = fullName;
  }
  public Integer getId() {
    return id;
  }
  public void setId(Integer id) {
    this.id = id;
  }
  

}
