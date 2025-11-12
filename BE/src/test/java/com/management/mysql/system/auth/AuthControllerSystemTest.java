package com.management.mysql.system.auth;

import com.management.mysql.system.auth.dto.AuthResponse;
import com.management.mysql.system.auth.dto.LoginRequest;
import com.management.mysql.system.security.JwtUtil;
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

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(SpringExtension.class)
@WebMvcTest(controllers = AuthController.class)
@AutoConfigureMockMvc(addFilters = false)
public class AuthControllerSystemTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private IAuthService authService;

    @MockBean
    private JwtUtil jwtUtil;

    @MockBean
    private RefreshTokenService refreshTokenService;

    @Test
    public void loginFlow_returnsAccessAndSetsRefreshCookie() throws Exception {
        // Arrange
        String json = "{\"username\":\"user@example.com\",\"password\":\"secret\"}";
        Mockito.when(authService.login(Mockito.any(LoginRequest.class), Mockito.anyString()))
                .thenReturn(new AuthResponse("access-token-123", "refresh-token-456"));

        // Act & Assert
        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isOk())
                .andExpect(header().stringValues("Set-Cookie", org.hamcrest.Matchers.hasItem(org.hamcrest.Matchers.containsString("refreshToken="))))
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.accessToken").value("access-token-123"));
    }
}
