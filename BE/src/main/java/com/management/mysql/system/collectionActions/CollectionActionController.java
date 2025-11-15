package com.management.mysql.system.collectionActions;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("api/collectionaction")
public class CollectionActionController {

    @Autowired
    private CollectionActionService collectionActionService;
    
    @PostMapping("/create")
    public ResponseEntity<?> registerCollectionAction(@RequestBody CollectionActionRequest entity) {
        Integer idCliente = entity.getIdCliente();
        Integer idCobranza = entity.getIdCobranza();
        collectionActionService.registerCollectionAction(idCobranza, idCliente);
        return ResponseEntity.ok("Accion de cobranza registrada exitosamente.");
    }

    @GetMapping("/getAll")
    public ResponseEntity<?> getAllCollectionActions() {
        return ResponseEntity.ok(collectionActionService.getAllActions());
    }
    
    
}
