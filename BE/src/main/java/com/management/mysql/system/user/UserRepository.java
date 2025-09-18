package com.management.mysql.system.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
  Optional<User> findByName(String name);
  Optional<User> findByEmail(String email);
  Optional<User> findByPhone(String phone);

  @Query("SELECT u FROM User u WHERE u.email = :value OR u.name = :value OR u.phone = :value")
  Optional<User> findByNameOrEmailOrPhone(@Param("value") String value);

  
}

