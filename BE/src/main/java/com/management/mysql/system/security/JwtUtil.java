package com.management.mysql.system.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import jakarta.annotation.PostConstruct;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.PrivateKey;
import java.security.PublicKey;
import java.util.Date;

@Component
public class JwtUtil implements ITokenProvider {
  private PrivateKey privateKey;
  private PublicKey publicKey;

  @Value("${jwt.private-key-path}")
  private String privateKeyPath;

  @Value("${jwt.public-key-path}")
  private String publicKeyPath;

  @Value("${jwt.expiration}")
  private Long expiration;

  @PostConstruct
  public void init() {
    try {
      privateKey = KeyUtil.getPrivateKey(privateKeyPath);
      publicKey = KeyUtil.getPublicKey(publicKeyPath);
    } catch (Exception e) {
      throw new RuntimeException("Error cargando claves RSA", e);
    }
  }

    @Override
    public String generateToken(String subject) {
        return Jwts.builder()
            .setSubject(subject)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + expiration))
            .signWith(privateKey, SignatureAlgorithm.RS256)
            .compact();
    }

    @Override
    public Claims validateToken(String token) throws RuntimeException {
        try {
        return Jwts.parserBuilder()
            .setSigningKey(publicKey)
            .build()
            .parseClaimsJws(token)
            .getBody(); 
        } catch (ExpiredJwtException e) {
        throw new RuntimeException("Token expired", e);
        } catch (MalformedJwtException e) {
        throw new RuntimeException("Malformed token", e);
        } catch (UnsupportedJwtException e) {
        throw new RuntimeException("Unsupported token", e);
        } catch (IllegalArgumentException e) {
        throw new RuntimeException("Token is empty or null", e);
        }
    }

    @Override
    public String getUsernameFromToken(String token) {
        Claims claims = validateToken(token);
        return claims.getSubject();
    }

    public boolean isTokenExpired(String token) {
        try {
        Claims claims = validateToken(token);
        return claims.getExpiration().before(new Date());
        } catch (RuntimeException e) {
        return false;
        }
    }
}

