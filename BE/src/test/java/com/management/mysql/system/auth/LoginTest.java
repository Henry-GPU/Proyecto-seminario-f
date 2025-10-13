package com.management.mysql.system.auth;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class LoginTest {

    @LocalServerPort
    private int port;

    private WebDriver driver;

    @BeforeEach
    public void setUp() {
        // TODO: Descarga chromedriver desde https://chromedriver.chromium.org/downloads y actualiza la ruta
        System.setProperty("webdriver.chrome.driver", "/path/to/chromedriver");
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless");
        driver = new ChromeDriver(options);
    }

    @Test
    public void testLogin() {
        driver.get("http://localhost:" + port + "/"); // Asumiendo que la página de login es la raíz

        // TODO: Actualiza los selectores para que coincidan con tu frontend
        WebElement usernameField = driver.findElement(By.id("username"));
        WebElement passwordField = driver.findElement(By.id("password"));
        WebElement loginButton = driver.findElement(By.tagName("button"));

        usernameField.sendKeys("admin");
        passwordField.sendKeys("password");
        loginButton.click();

        // Agrega una aserción para verificar que el login fue exitoso.
        // Por ejemplo, puedes verificar la URL o un mensaje de bienvenida.
        // assertEquals("http://localhost:" + port + "/dashboard", driver.getCurrentUrl());
    }

    @AfterEach
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
