package com.management.mysql.system.user.dto;

import java.util.List;
import java.util.UUID;

import jakarta.validation.constraints.NotNull;

public class UserPermissionsRequest {

  @NotNull(message = "No se especificó un usuario.")
  Integer user;

  List<Integer> permissions;

  public List<Integer> getPermissions() {
    return permissions;
  }

  public void setPermissons(List<Integer> permissons) {
    this.permissions = permissons;
  }


  public void setPermissions(List<Integer> permissions) {
    this.permissions = permissions;
  }

  public Integer getUser() {
    return user;
  }

  public void setUser(Integer user) {
    this.user = user;
  }

}
