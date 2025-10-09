package com.management.mysql.system.user;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.management.mysql.system.permission.Permission;
import com.management.mysql.system.permission.PermissionRepository;
import com.management.mysql.system.user.dto.UserResponse;
import com.management.mysql.system.user.dto.UserUpdateRequest;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class UserService {


    @Autowired
    private UserRepository userRepository;


    @Autowired
    private  UserPermissionRepository userPermissionRepository;

    @Autowired
    private PermissionRepository permissionRepository;

    @Transactional
    public List<UserResponse> getAllUsers() {
        List<UserResponse> users = userRepository.findAll().stream()
            .filter(u -> !"Superadmin".equalsIgnoreCase(u.getRole())) // 👈 Omitir rol específico
            .map(u -> {
                UserResponse ur = new UserResponse();
                ur.setId(u.getId());
                ur.setUsername(u.getName());
                ur.setFullName(u.getFullName());
                ur.setEmail(u.getEmail());
                ur.setPhone(u.getPhone());
                ur.setActive(u.getActive());
                ur.setDeleted(u.getDeleted());
                ur.setPermissions(
                    u.getUserPermissions().stream()
                    .map(up -> up.getPermission().getName())
                    .collect(Collectors.toSet())
                  
                );
                return ur;
            })
            .collect(Collectors.toList());
    
        return users;
    }
    

    @Transactional
    public void hardDelete(Integer userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new EntityNotFoundException("El usuario con el id " + userId + " no existe."));
        if (user.getDeleted()) {
            throw new IllegalArgumentException("El usuario ya fue eliminado.");
        }
        user.getUserPermissions().clear();
        userRepository.save(user);
        userRepository.deleteById(userId);
    }

    public List<String> getUserPermissions(Integer userId){

        User user = userRepository.findById(userId)
        .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        if (user.getDeleted()) {
        throw new  IllegalArgumentException("Este usuario fue eliminado.");
        }
        if (!user.getActive()) {
        throw new  IllegalArgumentException("Este usuario fue desactivado.");
        }
        List<String> permissions = user.getUserPermissions().stream()
        .map(up -> up.getPermission().getName())
        .toList();

        return permissions;
    }

    @Transactional
    public void desactiveUser(Integer userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new EntityNotFoundException("El usuario con el id " + userId + " no existe."));

        if (!user.getActive()) {
            throw new IllegalArgumentException("El usuario ya fue desactivado.");
        }

        user.setActive(false);
        userRepository.save(user);
    }

    @Transactional
    public void activateUser(Integer userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new EntityNotFoundException("El usuario con el id " + userId + " no existe."));

        if (user.getActive()) {
            throw new IllegalArgumentException("El usuario ya fue activado.");
        }

        user.setActive(true);
        userRepository.save(user);
    }

    @Transactional
    public User updateUser(UserUpdateRequest userUpdateRequest) {
        User user = userRepository.findById(userUpdateRequest.getId())
            .orElseThrow(() -> new EntityNotFoundException("El usuario con el id: [" + userUpdateRequest.getId() + "] no existe."));

        user.setName(userUpdateRequest.getUsername());
        user.setFullName(userUpdateRequest.getFullName());
        user.setPhone(userUpdateRequest.getPhone());
        user.setEmail(userUpdateRequest.getEmail());
        user.setActive(true);
        user.setDeleted(false);
        userRepository.save(user);
        return user;
    }

    @Transactional
    public UserResponse getUserById(Integer id) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("El usuario con el id: [" + id + "] no existe."));
    
        UserResponse userResponse = new UserResponse();
        userResponse.setId(user.getId());
        userResponse.setUsername(user.getName());
        userResponse.setFullName(user.getFullName());
        userResponse.setEmail(user.getEmail());
        userResponse.setPhone(user.getPhone());
        userResponse.setRole(user.getRole());
        userResponse.setActive(user.getActive());
        userResponse.setDeleted(user.getDeleted());
    
        userResponse.setPermissions(
            user.getUserPermissions().stream()
                .map(userPermission -> userPermission.getPermission().getName())
                .collect(Collectors.toSet())
        );
    
        return userResponse;
    }
    
    
    @Transactional
    public void assignPermissions(Integer userId, List<Integer> permissions) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado"));
        
        userPermissionRepository.deleteByUser(user);
        List<UserPermission> userPermissions = new ArrayList<>();
        for (Integer permissionId : permissions) {
            Permission permission = permissionRepository.findById(permissionId)
                .orElseThrow(() -> new EntityNotFoundException("Permiso no encontrado"));
            
            userPermissions.add(new UserPermission(user, permission));
        }
        userPermissionRepository.saveAll(userPermissions);
    }
    
}
