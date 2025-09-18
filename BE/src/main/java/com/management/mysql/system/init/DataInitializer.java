package com.management.mysql.system.init;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.management.mysql.system.audit.AuditEntityListener;
import com.management.mysql.system.permission.Permission;
import com.management.mysql.system.permission.PermissionRepository;
import com.management.mysql.system.user.User;
import com.management.mysql.system.user.UserPermission;
import com.management.mysql.system.user.UserPermissionRepository;
import com.management.mysql.system.user.UserRepository;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final PermissionRepository permissionRepository;
    private final UserPermissionRepository userPermissionRepository;

    public DataInitializer(
                PermissionRepository permissionRepository, 
                UserRepository usuarioRepository, 
                PasswordEncoder passwordEncoder,
                UserPermissionRepository userPermissionRepository) {
         
        this.userPermissionRepository = userPermissionRepository;
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.permissionRepository = permissionRepository;
    }


@Override
public void run(String... args) throws Exception {
    String adminEmail = "admin@admin.com";
    String adminPermission = "SUPERADMIN";

    // 🟢 Asegurarse que todos los permisos base existen (incluyendo SUPERADMIN)
    List<Permission> permisos = List.of(
        new Permission("SUPERADMIN", "Acceso completo al sistema", "Avanzados", ""),
        new Permission("MANAGE_USERS", "Gestionar usuarios", "Avanzados", ""),
        new Permission("CREATE_SALE", "Crear ventas", "Ventas", ""),
        new Permission("MANAGE_CUSTOMERS", "Gestionar clientes", "Avanzados", ""),
        new Permission("DOWNLOAD_INVENTORY", "Descargar inventario completo", "Avanzados", ""),
        new Permission("MANAGE_PERMISSIONS", "Gestionar permisos de los usuarios", "Avanzados", ""),
        new Permission("HARD_DELETE_PRODUCT", "Eliminar productos", "Inventario", ""),
        new Permission("EDIT_PRODUCT", "Editar productos", "Inventario", ""),
        new Permission("ADD_STOCK", "Agregar stock", "Inventario", ""),
        new Permission("CREATE_PRODUCT", "Crear productos", "Inventario", ""),
        new Permission("SWITCH_PRODUCT_STATUS", "Activar/desactivar productos", "Inventario", ""),
        new Permission("WITHDRAW_SERIAL", "Retirar series de productos", "Inventario", ""),
        new Permission("MANAGE_CATEGORIES", "Gestionar categorias de productos", "Avanzados", ""),
        new Permission("CONFIRM_INSTALLATION", "Confirmar instalación", "Envíos", ""),
        new Permission("CONFIRM_SHIPMENT", "Confirmar entrega", "Envíos", ""),  
        new Permission("CANCEL_SALE", "Cancelar ventas", "Ventas", "")
);

    for (Permission p : permisos) {
        if (permissionRepository.findByName(p.getName()) == null) {
            AuditEntityListener.skipAudit = true;
            permissionRepository.save(p);
            AuditEntityListener.skipAudit = false;
        }
    }
    System.out.println("ℹ️ Permisos creados");

    // 🟡 Obtener permiso SUPERADMIN ya creado
    Permission superadminPermission = permissionRepository.findByName(adminPermission);

    // 🔐 Crear usuario admin si no existe
    Optional<User> optionalAdmin = usuarioRepository.findByEmail(adminEmail);
    if (optionalAdmin.isEmpty()) {
        User admin = new User();
        admin.setEmail(adminEmail);
        admin.setName("Master");
        admin.setFullName("Master");
        admin.setPhone("123456768");
        admin.setPasswordHash(passwordEncoder.encode("H3nryG4132002.."));
        admin.setRole("Superadmin");
        admin.setCreatedAt(LocalDateTime.now());
        admin.setActive(true);
        admin.setDeleted(false);

        UserPermission userPermission = new UserPermission();
        userPermission.setUser(admin);
        userPermission.setPermission(superadminPermission);

        AuditEntityListener.skipAudit = true;
        usuarioRepository.save(admin);
        userPermissionRepository.save(userPermission);
        AuditEntityListener.skipAudit = false;

        System.out.println("✅ Usuario admin creado por defecto");
    } else {
        User existingAdmin = optionalAdmin.get();

        boolean hasSuperAdminPermission = existingAdmin.getUserPermissions().stream()
            .anyMatch(up -> up.getPermission().getName().equals(adminPermission));

        if (!hasSuperAdminPermission) {
            UserPermission userPermission = new UserPermission();
            userPermission.setUser(existingAdmin);
            userPermission.setPermission(superadminPermission);

            AuditEntityListener.skipAudit = true;
            userPermissionRepository.save(userPermission);
            AuditEntityListener.skipAudit = false;

            System.out.println("🔐 Permiso SUPERADMIN asignado al usuario existente");
        } else {
            System.out.println("ℹ️ El usuario admin ya tiene el permiso SUPERADMIN");
        }

        System.out.println("ℹ️ El usuario admin ya existe");
    }
}


}

