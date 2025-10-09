package com.management.mysql.system.security;

import io.jsonwebtoken.Claims;

public interface ITokenProvider {
    String generateToken(String username);
    Claims validateToken(String token) throws Exception;
    String getUsernameFromToken(String token);
}
