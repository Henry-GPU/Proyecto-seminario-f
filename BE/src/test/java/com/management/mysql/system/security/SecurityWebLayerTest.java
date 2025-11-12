package com.management.mysql.system.security;

import com.management.mysql.system.customer.CustomerController;
import com.management.mysql.system.customer.CustomerService;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.junit.jupiter.api.extension.ExtendWith;

import java.util.Collections;

import static org.mockito.Mockito.doAnswer;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@WebMvcTest(controllers = CustomerController.class)
@AutoConfigureMockMvc(addFilters = true)
public class SecurityWebLayerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CustomerService customerService;

    @Test
    public void whenNotAuthenticated_thenProtectedEndpointReturns401() throws Exception {
        mockMvc.perform(get("/api/customers/get").accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(username = "user1")
    public void whenAuthenticated_thenCanAccessCustomers() throws Exception {
        Mockito.when(customerService.getAllCustomers()).thenReturn(Collections.emptyList());
        mockMvc.perform(get("/api/customers/get").accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
}
