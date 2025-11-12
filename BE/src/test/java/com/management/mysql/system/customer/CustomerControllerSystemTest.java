package com.management.mysql.system.customer;

import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.junit.jupiter.api.extension.ExtendWith;

import java.util.Collections;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(SpringExtension.class)
@WebMvcTest(controllers = CustomerController.class)
@AutoConfigureMockMvc(addFilters = false)
public class CustomerControllerSystemTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CustomerService customerService;

    @MockBean
    private com.management.mysql.system.security.JwtFilter jwtFilter;

    @Test
    public void flow_createCustomer_then_getAllCustomers() throws Exception {
        // Arrange create
        String createJson = "{\"nombres\":\"Ana\",\"apellidos\":\"Lopez\",\"nit\":\"123\",\"telefono\":\"555\",\"email\":\"ana@example.com\",\"direccion\":\"Calle 1\",\"zona\":\"Centro\",\"ciudad\":\"GUA\",\"departamento\":\"GUAT\"}";
        Mockito.when(customerService.createCustomer(Mockito.any(Customer.class)))
                .thenAnswer(inv -> inv.getArgument(0));

        // Act & assert create
        mockMvc.perform(post("/api/customers/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(createJson))
                .andExpect(status().isCreated())
                .andExpect(content().string(Matchers.containsString("éxito")));

        // Arrange get
        Customer c = new Customer();
        c.setId(1);
        c.setNombres("Ana");
        Mockito.when(customerService.getAllCustomers()).thenReturn(Collections.singletonList(c));

        // Act & assert get
        mockMvc.perform(get("/api/customers/get").accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].nombres").value("Ana"));
    }
}
