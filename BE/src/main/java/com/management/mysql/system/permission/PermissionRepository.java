package com.management.mysql.system.permission;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.management.mysql.system.user.User;

@Repository
public interface PermissionRepository extends JpaRepository<Permission, Integer>{

  Permission findByName(String name);
  
}
