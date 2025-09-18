package com.management.mysql.system.permission;


import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

@Service
public class PermissionService {
  
  @Autowired PermissionRepository permissionRepository;

  @Transactional
  public List<Permission> getAllPermissions() {
    return permissionRepository.findAll().stream()
      .filter(p -> !"SUPERADMIN".equalsIgnoreCase(p.getName()))
      .collect(Collectors.toList());
  } 
}
