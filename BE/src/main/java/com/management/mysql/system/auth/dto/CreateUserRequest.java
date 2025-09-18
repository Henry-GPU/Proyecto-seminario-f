package com.management.mysql.system.auth.dto;

public class CreateUserRequest {
  private String id;
  private String username;
  private String fullName;
  private String phone;
  private String photo;

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
  public String getId() {
    return id;
  }
  public void setId(String id) {
    this.id = id;
  }

  
}
