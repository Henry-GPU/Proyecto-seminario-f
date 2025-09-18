package com.management.mysql.system.auth;

import com.management.mysql.system.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class RefreshTokenService {

    @Value("${refresh.token.validity.days:7}")
    private long refreshTokenValidityDays;

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    public RefreshToken createRefreshToken(User user) {
        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setUser(user);
        refreshToken.setRefreshToken(UUID.randomUUID().toString());
        refreshToken.setExpiresAt(LocalDateTime.now().plusDays(refreshTokenValidityDays));
        return refreshTokenRepository.save(refreshToken);
    }

    public RefreshToken createRefreshToken(User user, String ipAddress) {
        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setUser(user);
        refreshToken.setRefreshToken(UUID.randomUUID().toString());
        refreshToken.setExpiresAt(LocalDateTime.now().plusDays(refreshTokenValidityDays));
        refreshToken.setIpAddress(ipAddress);
        refreshToken.setIssuedAt(LocalDateTime.now());
        return refreshTokenRepository.save(refreshToken);
    }


    public Optional<RefreshToken> findByRefreshToken(String token) {
        return refreshTokenRepository.findByRefreshToken(token);
    }

    public boolean isExpired(RefreshToken token) {
        return token.getExpiresAt().isBefore(LocalDateTime.now());
    }

    @Transactional
    public void deleteByUserId(Integer userId) {
        refreshTokenRepository.deleteByUserId(userId);
    }

    @Transactional
    public void deleteByRefreshToken(String token) {
        refreshTokenRepository.deleteByRefreshToken(token);
    }
}
