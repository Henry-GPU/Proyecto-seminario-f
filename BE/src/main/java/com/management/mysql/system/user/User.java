package com.management.mysql.system.user;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import com.management.mysql.system.audit.AuditEntityListener;

import jakarta.persistence.*;

@Entity
@EntityListeners(AuditEntityListener.class)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "username")
    private String name;
    private String role;
    private String email;
    private String passwordHash;
    private String fullName;
    private String phone;
    public Boolean active;
    private Boolean deleted;
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private Set<UserPermission> userPermissions = new HashSet<>();    


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
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




    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRole() {
      return role;
    }

    public void setRole(String role) {
      this.role = role;
    }



    public Set<UserPermission> getUserPermissions() {
      return userPermissions;
    }



    public void setUserPermissions(Set<UserPermission> userPermissions) {
      this.userPermissions = userPermissions;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
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
