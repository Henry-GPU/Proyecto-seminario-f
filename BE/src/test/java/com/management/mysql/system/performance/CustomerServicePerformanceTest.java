package com.management.mysql.system.performance;

import com.management.mysql.system.customer.Customer;
import com.management.mysql.system.customer.CustomerRepository;
import com.management.mysql.system.customer.CustomerService;
import com.management.mysql.system.cuota.Cuota;
import com.management.mysql.system.cuota.CuotaRepository;
import com.management.mysql.system.debt.Debt;
import com.management.mysql.system.debt.DebtRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Collections;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class CustomerServicePerformanceTest {

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

        // Prepare a small, repeatable fixture
        Customer c1 = new Customer(); c1.setId(1);
        Customer c2 = new Customer(); c2.setId(2);
        Mockito.when(customerRepository.findAll()).thenReturn(Arrays.asList(c1, c2));

        Debt d1 = new Debt(); d1.setId(11);
        Debt d2 = new Debt(); d2.setId(22);
        Mockito.when(debtRepository.findByCustomer_Id(1)).thenReturn(d1);
        Mockito.when(debtRepository.findByCustomer_Id(2)).thenReturn(d2);

        Cuota ok = new Cuota(); ok.setEstado(1); ok.setFechaProgramada(LocalDate.now().plusDays(10));
        Cuota overdue = new Cuota(); overdue.setEstado(0); overdue.setFechaProgramada(LocalDate.now().minusDays(1));
        Mockito.when(cuotaRepository.findByDeuda_id(11)).thenReturn(Collections.singletonList(ok));
        Mockito.when(cuotaRepository.findByDeuda_id(22)).thenReturn(Collections.singletonList(overdue));
    }

    @Test
    public void getDistribucionMora_executesUnderThreshold() {
        // Warm-up
        customerService.getDistribucionMora();

        long start = System.nanoTime();
        for (int i = 0; i < 1000; i++) {
            customerService.getDistribucionMora();
        }
        long elapsedMs = (System.nanoTime() - start) / 1_000_000;

        // Assert: generous threshold to be environment-agnostic
        assertTrue(elapsedMs < 2000, "Should execute 1000 iterations under 2 seconds, took: " + elapsedMs + "ms");
    }
}
