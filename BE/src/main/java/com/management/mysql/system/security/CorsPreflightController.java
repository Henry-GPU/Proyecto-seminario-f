package com.management.mysql.system.security;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CorsPreflightController {

    // @RequestMapping(value = "/**", method = RequestMethod.OPTIONS)
    // public ResponseEntity<Void> handleOptions() {
    //     return ResponseEntity.status(HttpStatus.NO_CONTENT)
    //         .header("Access-Control-Allow-Origin", "*")  // o el dominio exacto
    //         .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    //         .header("Access-Control-Allow-Headers", "Authorization, Content-Type")
    //         .header("Access-Control-Allow-Credentials", "true")
    //         .build();
    // }
}
