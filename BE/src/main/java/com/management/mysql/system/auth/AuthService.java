package com.management.mysql.system.auth;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.management.mysql.system.auth.dto.AuthResponse;
import com.management.mysql.system.auth.dto.CreateUserRequest;
import com.management.mysql.system.auth.dto.LoginRequest;
import com.management.mysql.system.auth.dto.RegisterRequest;
import com.management.mysql.system.auth.dto.TokenRequest;
import com.management.mysql.system.security.ITokenProvider;
import com.management.mysql.system.user.User;
import com.management.mysql.system.user.UserRepository;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class AuthService implements IAuthService {

    @Autowired private UserRepository userRepository;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private ITokenProvider tokenProvider;
    @Autowired private RefreshTokenService refreshTokenService;

    public AuthResponse login(LoginRequest request, String ipAddress) {
        if (request.getUsername().trim() == null || request.getUsername().trim().isEmpty()) {
            throw new IllegalArgumentException("Ingrese credenciales correctas");
        }
        User user = userRepository.findByEmail(request.getUsername())
        .orElseThrow(()-> new IllegalArgumentException("Usuario no encontrado"));
        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new IllegalArgumentException("Credenciales inválidas.");
        }
        if(!user.getActive() || user.getDeleted()){
            throw new IllegalArgumentException("El usuario no está activo.");
        }
        String token = tokenProvider.generateToken(user.getId().toString());
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user, ipAddress);
        return new AuthResponse(token, refreshToken.getRefreshToken());
    }

    public String verifyAuthToken(TokenRequest token) {
        try {
            if (tokenProvider.validateToken(token.getToken()) != null) {
                return "token correcto.";
            }
        } catch (Exception e) {
            throw new IllegalArgumentException("token invalido.");
        }
        throw new IllegalArgumentException("token invalido.");
    }

    @Transactional
    public User register(RegisterRequest request) {
        Optional<User> existingUser = userRepository.findByEmail(request.getEmail());
        if (existingUser.isPresent()) {
            throw new IllegalArgumentException("El email proporcionado ya está asociado a una cuenta existente.");
        }
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setCreatedAt(LocalDateTime.now());
        user.setName(request.getUsername());
        user.setPhone(request.getPhone());
        user.setFullName(request.getFullName());
        user.setActive(true);
        user.setDeleted(false);
        return userRepository.save(user);
    }

    public AuthResponse refreshToken(String refreshTokenValue) {
        if (refreshTokenValue == null) {
            throw new IllegalArgumentException("No refresh token provided");
        }
        return refreshTokenService.findByRefreshToken(refreshTokenValue)
                .filter(rt -> !refreshTokenService.isExpired(rt))
                .map(rt -> {
                    User user = rt.getUser();
                    String newAccessToken = tokenProvider.generateToken(user.getId().toString());
                    return new AuthResponse(newAccessToken);
                })
                .orElseThrow(() -> new IllegalArgumentException("Refresh token inválido o expirado"));
    }

    public void logout(String refreshTokenValue) {
        if (refreshTokenValue != null) {
            refreshTokenService.findByRefreshToken(refreshTokenValue).ifPresent(token -> {
                refreshTokenService.deleteByRefreshToken(token.getRefreshToken());
            });
        }
    }

    @Transactional
    public void deleteUser(Integer userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));
        userRepository.delete(user);
    }
    @Transactional
    public void createRollBack(Integer userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));
        userRepository.delete(user);
    }
}
