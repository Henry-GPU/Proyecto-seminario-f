package com.management.mysql.system.user;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService{

  @Autowired
  private UserRepository userRepository;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    Optional<User> userOptional = userRepository.findByName(username);
    User user = userOptional.get();

    Set<GrantedAuthority> authorities = user.getUserPermissions().stream()
    .map(up -> new SimpleGrantedAuthority(up.getPermission().getName()))
    .collect(Collectors.toSet());

     return new org.springframework.security.core.userdetails.User(
      user.getName(), user.getPasswordHash(), authorities);
  }
  
}
