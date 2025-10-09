package com.management.mysql.system.audit;

import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class AuditService {
  private final AuditLogRepository auditLogRepository;

  public AuditService(AuditLogRepository auditLogRepository){
    this.auditLogRepository = auditLogRepository;
  }

  public void logAction(
    String entityName, 
    Integer entityId, 
    String action,
    String username,
    String details){

      AuditLog auditLog = new AuditLog();
      auditLog.setEntityName(entityName);
      auditLog.setEntityId(entityId);
      auditLog.setAction(action);
      auditLog.setUsername(username);
      auditLog.setDetails(details);
      auditLogRepository.save(auditLog);
  }
}
