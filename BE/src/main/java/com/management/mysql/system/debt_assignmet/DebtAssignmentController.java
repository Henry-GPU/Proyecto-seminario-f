package com.management.mysql.system.debt_assignmet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/debtassignment")
public class DebtAssignmentController {
    @Autowired
    private DebtAssignmentService debtAssignment;

    @PostMapping("/create")
    public ResponseEntity<?> createDebtAssignment(@RequestBody DebtAssignmentCreateRequest request) {
        try {
            debtAssignment.createDebtAssignment(request);
            return ResponseEntity.ok("La asignacion de la deuda fue exitosa");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al asignar la deuda");
        }
    }

    @GetMapping("/get")
    public ResponseEntity<?> getAllDebtAssignments() {
        try {
            return ResponseEntity.ok(debtAssignment.getAllDebtAssignments());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al obtener las asignaciones de deuda");
        }
    }

    @GetMapping("/getById")
    public ResponseEntity<?> getDebtAssignmentById(Integer id) {
        try {
            return ResponseEntity.ok(debtAssignment.getDebtAssignmentId(id));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al obtener la asignacion de deuda");
        }
    }
}
