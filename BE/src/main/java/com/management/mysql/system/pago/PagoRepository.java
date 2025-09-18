package com.management.mysql.system.pago;

import org.springframework.cglib.core.Local;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface PagoRepository extends JpaRepository<Pago, Integer> {
    List<Pago> findAllByDeuda_Id(Integer id);
    Pago findFirstByOrderByIdDesc();
}
