package com.management.mysql.system.auth;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Integer> {
    Optional<RefreshToken> findByRefreshToken(String refreshToken);
    Optional<RefreshToken> findByUserId(Integer userId);
    void deleteByUserId(Integer userId);
    @Modifying
    @Transactional
    @Query("DELETE FROM RefreshToken r WHERE r.refreshToken = :refreshToken")
    void deleteByRefreshToken(@Param("refreshToken") String refreshToken);
}
