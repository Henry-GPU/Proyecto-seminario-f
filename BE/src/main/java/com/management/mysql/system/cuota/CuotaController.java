package com.management.mysql.system.cuota;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/cuota")
public class CuotaController {
    @Autowired CuotaService cuotaService;

    @GetMapping("/pendientes/{id}")
    public ResponseEntity<?> cuotasPendientesPorCliente(@PathVariable Integer id){
        try {
            return  ResponseEntity.ok(cuotaService.cuotasPorPagarPorCliente(id));
        }catch (RuntimeException e){
            return ResponseEntity.badRequest().body("Oops, ocurrio un error: "  + e);
        }
    }
}
