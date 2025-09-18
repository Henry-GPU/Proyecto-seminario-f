package com.management.mysql.system.audit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import jakarta.persistence.PrePersist;
import jakarta.persistence.PreRemove;
import jakarta.persistence.PreUpdate;

@Component
public class AuditEntityListener {
  private static AuditService auditService;

  @Autowired
  public void setAuditService(AuditService service){
    auditService = service;
  }

  public static boolean skipAudit = false;

  @PrePersist
  public void onCreate(Object entity) {
      String entityDetails = entity.toString();  // Obtener los detalles completos de la entidad creada
      if (skipAudit) return;
      auditService.logAction(
          entity.getClass().getSimpleName(),
          null,
          "CREATE",
          getCurrentUser(),
          "Created entity with details: " + entityDetails
      );
  }
  
   
  @PreUpdate
  public void onUpdate(Object entity) {
    auditService.logAction(
      entity.getClass().getSimpleName(),
      getEntityId(entity),
      "UPDATE",
      getCurrentUser(),
      entity.toString()
    );
  }

  @PreRemove
  public void onDelete(Object entity) {
    auditService.logAction(
      entity.getClass().getSimpleName(),
      getEntityId(entity),
      "DELETE",
      getCurrentUser(),
      entity.toString()
    );
  }

  private String getCurrentUser(){
    Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    if (principal instanceof String) {
        return (String) principal;  // Si el principal es un String, lo usamos directamente
    } else if (principal instanceof UserDetails) {
        return ((UserDetails) principal).getUsername();  // Si es un objeto UserDetails, obtenemos el username
    }
    return "Anonymous";  // Si no es ninguno de los anteriores
}


  private Integer getEntityId(Object entity) {
    try {
        return (Integer) entity.getClass().getMethod("getId").invoke(entity);
    } catch (Exception e) {
        return null;
    }
}

}
