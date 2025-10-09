package com.management.mysql.system.account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/account")
public class AccountController {
    @Autowired
    AccountService accountService;

    @PostMapping
    public String createAccount(Integer id_usuario, Integer id_tipo_cuenta, String nombre, String descripcion, Integer estado) {
        try {
            accountService.createAccount(id_usuario, id_tipo_cuenta, nombre, descripcion, estado);
            return "Cuenta creada exitosamente.";
        } catch (Exception e) {
            return "Error al crear la cuenta.";
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllAccounts() {
        try {
            return ResponseEntity.ok(accountService.getAllAccounts());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al obtener las cuentas.");
        }
    }

    @GetMapping("{id}/get")
    public ResponseEntity<?> getAccountById(Integer id) {
        try {
            return ResponseEntity.ok(accountService.getAccountById(id));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al obtener la cuenta.");
        }
    }
}
