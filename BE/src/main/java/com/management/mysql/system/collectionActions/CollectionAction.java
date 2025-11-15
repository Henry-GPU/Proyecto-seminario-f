package com.management.mysql.system.collectionActions;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import java.time.LocalDate;
import java.time.LocalDateTime;

import com.management.mysql.system.user.User;

import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;

@Entity
public class CollectionAction {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer idCobranza;
    private Integer idDeuda;
    private String usuario;
    private LocalDateTime fecha;
    
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public Integer getIdCobranza() {
        return idCobranza;
    }
    public void setIdCobranza(Integer idCobranza) {
        this.idCobranza = idCobranza;
    }
    public Integer getIdDeuda() {
        return idDeuda;
    }
    public void setIdDeuda(Integer idDeuda) {
        this.idDeuda = idDeuda;
    }
    public String getUsuario() {
        return usuario;
    }
    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }
    public LocalDateTime getFecha() {
        return fecha;
    }
    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }

    


}
