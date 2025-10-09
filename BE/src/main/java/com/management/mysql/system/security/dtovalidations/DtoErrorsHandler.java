package com.management.mysql.system.security.dtovalidations;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class DtoErrorsHandler {

      @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> manejarValidacionUnError(MethodArgumentNotValidException ex) {
        FieldError errorPrincipal = ex.getBindingResult().getFieldErrors().get(0);

        String mensaje = errorPrincipal.getDefaultMessage();
        return ResponseEntity.badRequest().body(mensaje);
    } 
}
