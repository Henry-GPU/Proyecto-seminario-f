package com.management.mysql.system.customer;

import com.management.mysql.system.cuota.Cuota;
import com.management.mysql.system.cuota.CuotaRepository;
import com.management.mysql.system.debt.Debt;
import com.management.mysql.system.debt.DebtRepository;
import com.management.mysql.system.customer.dto.DistribucionMorasResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Collections;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class CustomerServiceUnitTest {

    @Mock
    private CustomerRepository customerRepository;
    @Mock
    private CuotaRepository cuotaRepository;
    @Mock
    private DebtRepository debtRepository;

    @InjectMocks
    private CustomerService customerService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void getDistribucionMora_countsBucketsCorrectly() {
        // Customers
        Customer c1 = new Customer(); c1.setId(1); // no overdue cuotas
        Customer c2 = new Customer(); c2.setId(2); // 2 overdue cuotas (morosos)
        Customer c3 = new Customer(); c3.setId(3); // 4 overdue cuotas (morosisimos)
        Customer c4 = new Customer(); c4.setId(4); // sin deuda

        Mockito.when(customerRepository.findAll()).thenReturn(Arrays.asList(c1, c2, c3, c4));

        // Debts
        Debt d1 = new Debt(); d1.setId(11);
        Debt d2 = new Debt(); d2.setId(22);
        Debt d3 = new Debt(); d3.setId(33);
        Mockito.when(debtRepository.findByCustomer_Id(1)).thenReturn(d1);
        Mockito.when(debtRepository.findByCustomer_Id(2)).thenReturn(d2);
        Mockito.when(debtRepository.findByCustomer_Id(3)).thenReturn(d3);
        Mockito.when(debtRepository.findByCustomer_Id(4)).thenReturn(null);

        // Cuotas
        Cuota paidUpcoming = new Cuota();
        paidUpcoming.setEstado(1); // pagada
        paidUpcoming.setFechaProgramada(LocalDate.now().plusDays(5));

        Cuota overdue1 = new Cuota();
        overdue1.setEstado(0);
        overdue1.setFechaProgramada(LocalDate.now().minusDays(1));

        Cuota overdue2 = new Cuota();
        overdue2.setEstado(0);
        overdue2.setFechaProgramada(LocalDate.now().minusDays(2));

        Cuota overdue3 = new Cuota();
        overdue3.setEstado(0);
        overdue3.setFechaProgramada(LocalDate.now().minusDays(3));

        Cuota overdue4 = new Cuota();
        overdue4.setEstado(0);
        overdue4.setFechaProgramada(LocalDate.now().minusDays(4));

        Mockito.when(cuotaRepository.findByDeuda_id(11)).thenReturn(Collections.singletonList(paidUpcoming)); // 0 moras vencidas => solventes +1
        Mockito.when(cuotaRepository.findByDeuda_id(22)).thenReturn(Arrays.asList(overdue1, overdue2)); // 2 moras => morosos +1
        Mockito.when(cuotaRepository.findByDeuda_id(33)).thenReturn(Arrays.asList(overdue1, overdue2, overdue3, overdue4)); // 4 moras => morosisimos +1

        // Act
        DistribucionMorasResponse res = customerService.getDistribucionMora();

        // Assert
        assertEquals(1, res.getSolventes());
        assertEquals(1, res.getMorosos());
        assertEquals(1, res.getMorosisimos());
        assertEquals(1, res.getSinDeudas());
    }
}
