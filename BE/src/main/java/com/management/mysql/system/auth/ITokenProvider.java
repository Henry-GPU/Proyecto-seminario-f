package com.management.mysql.system.auth;

import io.jsonwebtoken.Claims;

public interface ITokenProvider {
    String generateToken(String username);
    Claims validateToken(String token) throws Exception;
    String getUsernameFromToken(String token);
}
