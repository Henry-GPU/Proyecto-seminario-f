package com.management.mysql.system.security;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        // Configura los orígenes permitidos
        //config.addAllowedOriginPattern("https://www.quarkms.click");
        //config.addAllowedOriginPattern("https://api.quarkms.click");
        //config.addAllowedOriginPattern("http://quarkmsfrontend.s3-website.us-east-2.amazonaws.com");
        //config.addAllowedOriginPattern("https://d8owx1d7gvekn.cloudfront.net");
        config.addAllowedOriginPattern("http://192.168.0.15:3000"); // Permite localhost para desarrollo
        config.addAllowedOriginPattern("http://localhost:3000");
        // Métodos permitidos
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        // Encabezados permitidos
        config.setAllowedHeaders(List.of("Authorization", "Content-Type", "Cookie", "X-Requested-With", "Accept", "Origin"));

        // Encabezados expuestos
        config.setExposedHeaders(List.of("Authorization", "Set-Cookie"));
        

        // Permitir credenciales (cookies, autenticación)
        config.setAllowCredentials(true);

        // Aplica la configuración a todas las rutas
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
