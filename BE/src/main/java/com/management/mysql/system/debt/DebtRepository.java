package com.management.mysql.system.debt;

import java.beans.Customizer;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.management.mysql.system.customer.Customer;

@Repository
public interface DebtRepository extends JpaRepository<Debt, Integer> {
    Debt findByCustomer_Id(Integer id);
    
    @Query("SELECT SUM(c.montoInicial) FROM Debt c ")
    Double sumaTotal();

    List<Debt> findByEstado(Integer estado);
}
