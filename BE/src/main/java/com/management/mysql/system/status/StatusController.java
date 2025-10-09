package com.management.mysql.system.status;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("api/status")
public class StatusController {

    @Autowired
    private StatusService statusService;
    
    @PostMapping("/create")
    public ResponseEntity<?> createStatus(@RequestBody StatusCreateRequest request) {
        try {
            statusService.createStatus(request.getDescripcion());
            return ResponseEntity.ok("Estado creado exitosamente.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al crear el estado.");
        }
    } 
    @GetMapping("/get")
    public List<Status> getAllStatus() {
        return statusService.getAllStatus();
    }
    @GetMapping("{id}/get")
    public Status getStatusById(@PathVariable Integer id) {
        return statusService.getStatusById(id);
    }
}
