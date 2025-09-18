package com.management.mysql.system.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.management.mysql.system.permission.Permission;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class UserPermission {
  
   @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JsonIgnore
    private User user;

    @ManyToOne
    @JsonIgnore
    private Permission permission;


    public UserPermission() {
    }

    public UserPermission(User user, Permission permission) {
      this.user = user;
      this.permission = permission;
    }

    public Integer getId() {
      return id;
    }

    public void setId(Integer id) {
      this.id = id;
    }

    public User getUser() {
      return user;
    }

    public void setUser(User user) {
      this.user = user;
    }

    public Permission getPermission() {
      return permission;
    }

    public void setPermission(Permission permission) {
      this.permission = permission;
    }

    
}
