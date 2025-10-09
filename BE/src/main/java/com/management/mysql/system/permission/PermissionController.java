package com.management.mysql.system.permission;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/permissions")
public class PermissionController {

  @Autowired PermissionService permissionService;
  
  @GetMapping("/get")
  public ResponseEntity<?> getAllPermissions(){
    return ResponseEntity.ok(permissionService.getAllPermissions());
  }
}
