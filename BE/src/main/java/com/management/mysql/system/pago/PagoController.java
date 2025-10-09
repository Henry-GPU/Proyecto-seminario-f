package com.management.mysql.system.pago;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import software.amazon.awssdk.core.Response;

@RestController
@RequestMapping("api/pago")
public class PagoController {

    @Autowired PagoService pagoService;

    @GetMapping("/{id}/vencido")
    public ResponseEntity<?> getPagosVencidos(@PathVariable Integer id){
        try {
            return ResponseEntity.ok(pagoService.getCuotaVencida(id));
        }catch (RuntimeException e){
            return ResponseEntity.badRequest().body(pagoService.getCuotaVencida(id));
        }
    }
    @PostMapping("/registrar")
    public ResponseEntity<?> registrarPago(@RequestBody PagoCuotaRequest request){
        try {
            return  ResponseEntity.ok(pagoService.registrarPago(request));
        }catch (RuntimeException e){
            return  ResponseEntity.badRequest().body("Oops, algo salió mal: " + e);
        }
    }
    @GetMapping("/get/total")
    public ResponseEntity<?> getTotalPagosRegistrados(){
        try {
            return ResponseEntity.ok(pagoService.getAllPagosRegistrados());
        }catch (RuntimeException e){
            return ResponseEntity.badRequest().body("Oops, algo salió mal: " + e);
        }
    }
}
