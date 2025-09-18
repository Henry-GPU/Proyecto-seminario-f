package com.management.mysql.system.security;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         org.springframework.security.core.AuthenticationException authException)
            throws IOException, ServletException {
        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // Código de estado 401
        String errorMsg = authException.getMessage() != null ? authException.getMessage() : "No autorizado. Por favor, inicia sesión.";
        response.getWriter().write("{\"error\": \"" + errorMsg.replace("\"", "'") + "\"}");
    }
}
