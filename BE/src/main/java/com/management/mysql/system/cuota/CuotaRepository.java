package com.management.mysql.system.cuota;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface CuotaRepository extends JpaRepository<Cuota, Integer> {
    Long countByEstado(Integer estado);
    Long countByFechaProgramadaLessThanAndEstadoAndDeuda_id(LocalDate fechaProgramada, Integer estado, Integer idDeuda);
    Cuota findFirstByDeuda_idAndEstadoOrderByFechaProgramadaAsc(Integer idDeuda, Integer estado);
    List<Cuota> findAllByDeuda_idAndEstado(Integer id, Integer estado);
    List<Cuota> findByDeuda_id(Integer id);
}
