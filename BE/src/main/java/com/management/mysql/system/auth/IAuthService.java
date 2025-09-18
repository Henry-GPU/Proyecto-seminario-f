package com.management.mysql.system.auth;

import java.util.UUID;

import com.management.mysql.system.auth.dto.AuthResponse;
import com.management.mysql.system.auth.dto.LoginRequest;
import com.management.mysql.system.auth.dto.RegisterRequest;
import com.management.mysql.system.auth.dto.TokenRequest;
import com.management.mysql.system.user.User;



public interface IAuthService {
    AuthResponse login(LoginRequest request, String ipAddress);
    String verifyAuthToken(TokenRequest token);
    User register(RegisterRequest request);
    AuthResponse refreshToken(String refreshTokenValue);
    void logout(String refreshTokenValue);
    void deleteUser(Integer userId);
    void createRollBack(Integer userId);
}
