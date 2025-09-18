package com.management.mysql.system.debt;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/debt")
public class DebtController {

    @Autowired
    DebtService debtService;

    @PostMapping("/create")
    public ResponseEntity<?> createDebt(@RequestBody DebtCreateRequest request) {
        try {
            debtService.createDebt(request);
            return ResponseEntity.ok("Deuda creada exitosamente.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al crear la deuda.");
        }
    }

    @GetMapping("/get")
    public ResponseEntity<?> getAllDebts() {
        try {
            return ResponseEntity.ok(debtService.getAllDebts());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al obtener las deudas.");
        }
    }
    @GetMapping("/get/total-no")
    public ResponseEntity<?> getNoDebts() {
        try {
            return ResponseEntity.ok(debtService.getTotalDebts());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al obtener las deudas.");
        }
    }

    @GetMapping("/get/total")
    public ResponseEntity<?> getTotalAllDebts() {
        try {
            return ResponseEntity.ok(debtService.getTotalAllDebts());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al obtener las deudas.");
        }
    }
    @GetMapping("{id}/get")
    public ResponseEntity<?> getDebtById(Integer id) {
        try {
            return ResponseEntity.ok(debtService.getDebtById(id));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al obtener la deuda.");
        }
    }
}

