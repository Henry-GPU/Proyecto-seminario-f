package com.management.mysql.system.collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("api/collection")
public class CollectionController {
    @Autowired
    private CollectionService collectionService;

    @PostMapping("/create")
    public ResponseEntity<?> createCollection(@RequestBody CollectionCreateRequest request) {
        try {
            collectionService.createCollection(request);
            return ResponseEntity.ok("Metodo de cobranza creado exitosamente.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al crear el metodo de cobranza.");
        }
    }

    @GetMapping("/get/monto-por-canal")
    public ResponseEntity<?> getMontoPorCanal() {
        try {
            return ResponseEntity.ok(collectionService.getMontoPorCanal());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al obtener el monto por canal.");
        }
    }
    

    @GetMapping("/get")
    public ResponseEntity<?> getAllCollections() {
        try {
            return ResponseEntity.ok(collectionService.getAllCollections());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al obtener los metodos de cobranza.");
        }
    }

    @GetMapping("/getById")
    public ResponseEntity<?> getCollectionById(Integer id) {
        try {
            return ResponseEntity.ok(collectionService.getCollectionById(id));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al obtener el metodo de cobranza.");
        }
    }
}
