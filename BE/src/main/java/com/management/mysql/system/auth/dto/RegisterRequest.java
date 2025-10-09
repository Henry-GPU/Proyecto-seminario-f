package com.management.mysql.system.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class RegisterRequest {

    @Pattern(
        regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@$%^&*()_+=<>?{}\\[\\]\\.\\-])[A-Za-z\\d!@$%^&*()_+=<>?{}\\[\\]\\.\\-]{8,}$",
        message = "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo")
    private String password;

    @NotBlank(message = "El correo electrónico es obligatorio.")
    @Email(message = "El correo electrónico no es válido.")
    private String email;

  @NotBlank(message = "El nombre de usuario es obligatorio.")
  @Pattern(regexp = "^[a-zA-Z]{8,20}$", message = "El nombre de usuario solo puede contener letras y tener de 8 a 20 caracteres.")
  private String username;

  @NotBlank(message = "El nombre completo es obligatorio.")
  private String fullName;

  @NotBlank(message = "El número de teléfono es obligatorio.")
  @Pattern(regexp = "^[0-9]{8,8}$", message = "El número de teléfono debe contener solo dígitos y tener 8 dígitos.")
  private String phone;

  private String photo;
    
  public String getPassword() {
    return password;
  }
  public void setPassword(String password) {
    this.password = password;
  }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getUsername() {
      return username;
    }
    public void setUsername(String username) {
      this.username = username;
    }
    public String getFullName() {
      return fullName;
    }
    public void setFullName(String fullName) {
      this.fullName = fullName;
    }
    public String getPhone() {
      return phone;
    }
    public void setPhone(String phone) {
      this.phone = phone;
    }
    public String getPhoto() {
      return photo;
    }
    public void setPhoto(String photo) {
      this.photo = photo;
    }

}
