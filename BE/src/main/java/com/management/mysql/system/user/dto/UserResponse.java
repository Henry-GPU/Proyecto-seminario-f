package com.management.mysql.system.user.dto;

import java.security.Permission;
import java.util.Set;
import java.util.UUID;

public class UserResponse{
  private Integer id;
  private String username;
  private String phone;
  private String email;
  private String fullName;
  private String role;
  private Boolean active;
  private Boolean deleted;
  private Set<String> permissions;
  
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

  public Set<String> getPermissions() {
    return permissions;
  }
  public void setPermissions(Set<String> permissions) {
    this.permissions = permissions;
  }
  public String getRole() {
    return role;
  }
  public void setRole(String role) {
    this.role = role;
  }

  public Boolean getActive() {
    return active;
  }
  public void setActive(Boolean active) {
    this.active = active;
  }
  public Boolean getDeleted() {
    return deleted;
  }
  public void setDeleted(Boolean deleted) {
    this.deleted = deleted;
  }
  public Integer getId() {
    return id;
  }
  public void setId(Integer id) {
    this.id = id;
  }

}
