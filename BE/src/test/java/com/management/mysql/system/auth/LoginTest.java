package com.management.mysql.system.auth;

import io.github.bonigarcia.wdm.WebDriverManager;
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
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ActiveProfiles("test")
public class LoginTest {

    @LocalServerPort
    private WebDriver driver;
    private int port;

    @BeforeEach
    public void setUp() {
        WebDriverManager.chromedriver().setup();
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless");
        driver = new ChromeDriver(options);
    }

    @Test
    public void testLogin() {
        driver.get("http://localhost:3000"); // Asumiendo que la página de login es la raíz
        // TODO: Actualiza los selectores para que coincidan con tu frontend
        WebElement usernameField = driver.findElement(By.xpath("/html/body/div/div/div/div/div/form/div[1]/input"));
        WebElement passwordField = driver.findElement(By.xpath("//*[@id=\"password\"]"));
        WebElement loginButton = driver.findElement(By.xpath("//*[@id=\"root\"]/div/div/div/div/form/div[3]/button"));

        usernameField.sendKeys("admin");
        passwordField.sendKeys("password");
        loginButton.click();

        // Agrega una aserción para verificar que el login fue exitoso.
        // Por ejemplo, puedes verificar la URL o un mensaje de bienvenida.
    }

    @AfterEach
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
