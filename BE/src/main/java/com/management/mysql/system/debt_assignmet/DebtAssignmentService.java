package com.management.mysql.system.debt_assignmet;

import com.management.mysql.system.collection.Collection;
import com.management.mysql.system.collection.CollectionRepository;
import com.management.mysql.system.customer.Customer;
import com.management.mysql.system.customer.CustomerRepository;
import com.management.mysql.system.debt.Debt;
import com.management.mysql.system.debt.DebtRepository;
import com.management.mysql.system.user.User;
import com.management.mysql.system.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.beans.Customizer;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@Service
public class DebtAssignmentService {
    @Autowired
    private DebtAssignmentRepository debtAssignmentRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private DebtRepository debtRepository;
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private CollectionRepository collectionRepository;

    private SecurityContextHolder securityContextHolder;

    private String getCurrentUsername() {
        return (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    public DebtAssignment createDebtAssignment(DebtAssignmentCreateRequest request) {
        System.out.println(request.getIdCobranza().toString() + request.getIdDeuda().toString() + request.getIdUsuario().toString());
        try {
            User user = userRepository.findById(request.getIdUsuario()).orElseThrow();
            Customer customer = customerRepository.findById(request.getIdDeuda()).orElseThrow();
            Debt debt = debtRepository.findByCustomer_Id(customer.getId());
            Collection collection = collectionRepository.findById(request.getIdCobranza()).orElseThrow();
            
            System.out.println(request);
            DebtAssignment debtAssignment = new DebtAssignment();
            debtAssignment.setDebt(debt);
            debtAssignment.setCobranza(collection);
            debtAssignment.setDescripcion(request.getDescripcion());
            debtAssignment.setUser(user);
            debt.setEstado(1);
            debtRepository.save(debt);
            return debtAssignmentRepository.save(debtAssignment);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new RuntimeException("Error al encontrar entidades relacionadas", e);
        }
        

    }

    public List<DebtAssignmentResponse> getAllDebtAssignments() {
        List<DebtAssignmentResponse> debtAssignmentResponses = new ArrayList<>();

        List<Debt> debts = debtRepository.findByEstado(1);

        for (Debt d : debts) {  
            DebtAssignment debtAssignment = debtAssignmentRepository.findByDebt_Id(d.getId()); 
            DebtAssignmentResponse debtAssignmentResponse = new DebtAssignmentResponse();
            debtAssignmentResponse.setIdDeuda(d.getId());
            debtAssignmentResponse.setNombreCliente(d.getCustomer().getNombres() + " " + d.getCustomer().getApellidos());
            debtAssignmentResponse.setCanalCobranza(debtAssignment.getCobranza().getNombre());
            debtAssignmentResponse.setFechaDeuda(d.getFechaAsignacion());
            debtAssignmentResponse.setMonto(d.getMontoInicial());
            debtAssignmentResponse.setUsuarioAsignado(debtAssignment.getUser().getFullName());
            debtAssignmentResponses.add(debtAssignmentResponse);
        }
        return debtAssignmentResponses;
    }

    public DebtAssignment getDebtAssignmentId(Integer id) {
        return debtAssignmentRepository.findById(id).orElse(null);
    }
}
