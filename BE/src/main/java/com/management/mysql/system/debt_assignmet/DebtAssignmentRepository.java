package com.management.mysql.system.debt_assignmet;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DebtAssignmentRepository extends JpaRepository<DebtAssignment, Integer> {
    DebtAssignment findByDebt_Id(Integer id);
    List<DebtAssignment> findAllByCobranza_Id(Integer id);
}
