package com.management.mysql.system.debt_assignmet;

import com.management.mysql.system.collection.Collection;
import com.management.mysql.system.debt.Debt;
import com.management.mysql.system.user.User;
import jakarta.persistence.*;

@Entity
public class DebtAssignment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "id_deuda", referencedColumnName = "id")
    private Debt debt;
    @OneToOne
    @JoinColumn(name = "id_cobranza", referencedColumnName = "id")
    private Collection cobranza;
    @OneToOne
    @JoinColumn(name = "id_usuario", referencedColumnName = "id")
    private User user;
    private String descripcion;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Debt getDebt() {
        return debt;
    }

    public void setDebt(Debt debt) {
        this.debt = debt;
    }

    public Collection getCobranza() {
        return cobranza;}
    public void setCobranza(Collection cobranza) {
        this.cobranza = cobranza;}

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public String setDescripcion(String descripcion) {
        return descripcion;
    }
}
