package com.management.mysql.system.user;

import java.util.Set;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserPermissionRepository extends JpaRepository<UserPermission, Integer> {
  void deleteAllByUserId(Integer userId);
  Set<UserPermission> findByUserId(Integer userId);
  
  @Modifying
  @Query("DELETE FROM UserPermission up WHERE up.user = :user")
  void deleteByUser(@Param("user") User user);
}
