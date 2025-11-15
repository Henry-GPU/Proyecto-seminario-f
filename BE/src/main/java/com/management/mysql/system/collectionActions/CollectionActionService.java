package com.management.mysql.system.collectionActions;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.management.mysql.system.collection.Collection;
import com.management.mysql.system.collection.CollectionRepository;
import com.management.mysql.system.customer.Customer;
import com.management.mysql.system.customer.CustomerRepository;
import com.management.mysql.system.debt.Debt;
import com.management.mysql.system.debt.DebtRepository;
import com.management.mysql.system.user.User;
import com.management.mysql.system.user.UserRepository;

@Service
public class CollectionActionService {

    @Autowired
    private DebtRepository debtRepository;
    
    @Autowired
    private CustomerRepository customerRepository;
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CollectionRepository collectionRepository;

    @Autowired
    private CollectionActionRepository actionRepository;

    private String getCurrentUsername() {
        return (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
    public void registerCollectionAction(Integer idCobranza, Integer idCliente) {
        String usuario = getCurrentUsername();
        Debt debt = debtRepository.findByCustomer_Id(idCliente);

        CollectionAction action = new CollectionAction();
        action.setIdCobranza(idCobranza);
        action.setIdDeuda(debt.getId());
        action.setUsuario(usuario);
        action.setFecha(LocalDateTime.now());
        actionRepository.save(action);
    }

    public List<CollectionActionResponse> getAllActions() {
       List<CollectionAction> collectionActions = actionRepository.findAll();
       List<CollectionActionResponse> responses = new java.util.ArrayList<>();
        System.out.println(List.of(collectionActions));
       for(CollectionAction a : collectionActions) {
        CollectionActionResponse response = new CollectionActionResponse();
        User user = userRepository.findById(Integer.parseInt(a.getUsuario())).orElse(null);
        Debt debt = debtRepository.findById(a.getIdDeuda()).orElse(null);
        Customer customer = customerRepository.findById(debt.getCustomer().getId()).orElse(null);
        Collection collection = collectionRepository.findById(a.getIdCobranza()).orElse(null);
        response.setCliente(customer.getNombres() + " " + customer.getApellidos());
        response.setUsuario(user.getFullName());
        response.setAccion(collection.getNombre());
        response.setIdDeuda(a.getIdDeuda());
        response.setFecha(a.getFecha());
        responses.add(response);
       }
       return responses;
    }

}
