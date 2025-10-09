package com.management.mysql.system.user;

import org.springframework.web.bind.annotation.RestController;

import com.management.mysql.system.user.dto.UserPermissionsRequest;
import com.management.mysql.system.user.dto.UserResponse;
import com.management.mysql.system.user.dto.UserUpdateRequest;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
@RequestMapping("api/users")
public class UserController {

  @Autowired
  private UserService userService;

  
  @GetMapping("/get")
  public ResponseEntity<?> getAllUsers() {
      return ResponseEntity.ok(userService.getAllUsers());
  }


  @GetMapping("/{id}/permissions/get")
  public ResponseEntity<?> getUserPermissions(@PathVariable Integer id) {
    try {
      System.out.println(id);
      List<String> userPermissions = userService.getUserPermissions(id);
      return ResponseEntity.ok(userPermissions);
    } catch (EntityNotFoundException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
    }
  }
    

  @GetMapping("/{id}/get")
  public ResponseEntity<?> getUserById(@PathVariable Integer id) {
    try {
      UserResponse user = userService.getUserById(id);
      return ResponseEntity.ok(user);
    } catch (EntityNotFoundException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado.");
    }
  }

  @PatchMapping("/update")
  public ResponseEntity<?> updateUser(@RequestBody @Valid UserUpdateRequest userRequest){
    try {
      userService.updateUser(userRequest);
      return ResponseEntity.ok("Usuario actualizado correctamente.");
    } catch (EntityNotFoundException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado.");
    }
  }

  @DeleteMapping("/{id}/delete")
  public ResponseEntity<?> hardDelete(@PathVariable Integer id){
    try {
      userService.hardDelete(id);
      return ResponseEntity.ok("Usuario eliminado correctamente. ");
    } catch (EntityNotFoundException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("El usuario con el id especificado no existe.");
    }catch (IllegalArgumentException e){
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }
  }

  @PatchMapping("/{id}/desactivate")
  public ResponseEntity<?> desactiveUser(@PathVariable Integer id){
    try {
      userService.desactiveUser(id);
      return ResponseEntity.ok("Usuario correctamente desactivado");
    } catch (EntityNotFoundException e) {
      return ResponseEntity.status(404).body("El usuario no fue encontrado.");
    }catch (IllegalArgumentException e){
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Algo salió mal al desactivar el usuario.");
    }
  }

  @PatchMapping("/{id}/activate")
  public ResponseEntity<?> activeUser(@PathVariable Integer id){
        try {
      userService.activateUser(id);
      return ResponseEntity.ok("Usuario correctamente activado");
    } catch (EntityNotFoundException e) {
      return ResponseEntity.status(404).body("El usuario no fue encontrado.");
    }catch (IllegalArgumentException e){
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Algo salió mal al activar el usuario.");
    }
  }

  @PatchMapping("/permissions")
  public ResponseEntity<?> updatePermissions(@RequestBody @Valid UserPermissionsRequest permissionsRequest) {
    try {
      userService.assignPermissions(permissionsRequest.getUser(), permissionsRequest.getPermissions());
      return ResponseEntity.ok("Permisos actualizados correctamente.");
    } catch (EntityNotFoundException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }    
  }
  
}
