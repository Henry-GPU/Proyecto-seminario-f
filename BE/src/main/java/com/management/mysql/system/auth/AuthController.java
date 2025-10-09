package com.management.mysql.system.auth;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.management.mysql.system.auth.dto.AuthResponse;
import com.management.mysql.system.auth.dto.LoginRequest;
import com.management.mysql.system.auth.dto.RegisterRequest;
import com.management.mysql.system.auth.dto.TokenRequest;
import com.management.mysql.system.security.JwtUtil;
import com.management.mysql.system.user.User;
import com.management.mysql.system.user.UserRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.ResponseCookie;
import org.springframework.http.HttpHeaders;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private RefreshTokenService refreshTokenService;

    private final IAuthService authService;

    @Autowired
    public AuthController(IAuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid LoginRequest request, HttpServletRequest httpServletRequest) {
        try {
            String ipAddress = httpServletRequest.getRemoteAddr();
            AuthResponse response = authService.login(request, ipAddress);

           ResponseCookie cookie = ResponseCookie.from("refreshToken", response.getRefreshToken())
                .httpOnly(true)
                .secure(false)
                .path("/")
                .sameSite("Lax")
                .maxAge(7 * 24 * 60 * 60)
                .build();
            ResponseCookie statusCookie = ResponseCookie.from("hasRefreshToken", "true")
                .httpOnly(false)
                .secure(false)
                .path("/")
                .maxAge(7 * 24 * 60 * 60)
                .sameSite("Lax")
                .build();

            return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString(), statusCookie.toString())
                .body(new AuthResponse(response.getAccessToken()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @PostMapping("/verifyAuthToken")
    public ResponseEntity<?> verifyAuthToken(@RequestBody TokenRequest token) {
        try {
            String result = authService.verifyAuthToken(token);
            return ResponseEntity.ok(result);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }


    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid RegisterRequest request) {
        try {
            authService.register(request);
            return ResponseEntity.ok("Usuario registrado con éxito.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@CookieValue(value = "refreshToken", required = false) String refreshTokenValue) {
        try {
            AuthResponse response = authService.refreshToken(refreshTokenValue);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @DeleteMapping("/create/rollback/{userId}")
    public ResponseEntity<?> createRollBack(@PathVariable Integer userId) {
        try {
            authService.createRollBack(userId);
            return ResponseEntity.ok("Usuario eliminado con éxito. ID: " + userId);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@CookieValue(value = "refreshToken", required = true) String refreshTokenValue) {
        authService.logout(refreshTokenValue);
        ResponseCookie deleteCookie = ResponseCookie.from("refreshToken", "")
            .httpOnly(true)
            .secure(false)
            .path("/")
            .maxAge(0)
            .sameSite("Lax")
            .build();
        ResponseCookie deleteStatus = ResponseCookie.from("hasRefreshToken", "")
            .httpOnly(false)
            .secure(false)
            .path("/")
            .maxAge(0)
            .sameSite("Lax")
            .build();

        return ResponseEntity.ok()
            .header(HttpHeaders.SET_COOKIE, deleteCookie.toString(), deleteStatus.toString())
            .body("Sesión cerrada correctamente");
    }
}
