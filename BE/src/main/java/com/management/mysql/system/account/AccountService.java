package com.management.mysql.system.account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    public Account createAccount(Integer id_cuenta, Integer id_cliente, String tipo_cuenta, String fecha_apertura, Integer estado) {
        Account account = new Account();
        account.setId_cuenta(id_cuenta);
        account.setId_cliente(id_cliente);
        account.setTipo_cuenta(tipo_cuenta);
        account.setFecha_apertura(fecha_apertura);
        account.setEstado(estado);
        return accountRepository.save(account);
    }

    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    public Account getAccountById(Integer id) {
        return accountRepository.findById(id).orElse(null);
    }
}
