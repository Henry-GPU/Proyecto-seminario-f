package com.management.mysql.system.permission;

import java.util.HashSet;
import java.util.Set;

import com.management.mysql.system.user.UserPermission;

import jakarta.persistence.*;

@Entity
public class Permission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private String visibleName;
    private String description;
    private String type;

    @OneToMany(mappedBy = "permission", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private Set<UserPermission> userPermissions = new HashSet<>();    

    public Permission() {
    }
    
    public Permission(String name, String visibleName, String type, String description) {
        this.name = name;
        this.visibleName = visibleName;
        this.type = type;
        this.description = description;
    }
    

    public Permission(String name) {
        this.name = name;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getVisibleName() {
        return visibleName;
    }

    public void setVisibleName(String visibleName) {
        this.visibleName = visibleName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getType() {
      return type;
    }

    public void setType(String type) {
      this.type = type;
    }
}
