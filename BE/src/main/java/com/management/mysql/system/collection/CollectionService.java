package com.management.mysql.system.collection;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.management.mysql.system.debt_assignmet.DebtAssignment;
import com.management.mysql.system.debt_assignmet.DebtAssignmentRepository;

@Service
public class CollectionService {
    @Autowired
    private CollectionRepository collectionRepository;
    @Autowired private DebtAssignmentRepository debtAssignmentRepository;
    public Collection createCollection(CollectionCreateRequest request) {
        Collection collection = new Collection();
        collection.setNombre(request.getNombre());
        collection.setDescripcion(request.getDescripcion());
        return collectionRepository.save(collection);
    }

    public List<Collection> getAllCollections() {
        return collectionRepository.findAll();
    }

    public Collection getCollectionById(Integer id) {
        return collectionRepository.findById(id).orElse(null);
    }

    public List<MontoPorCanalResponse> getMontoPorCanal() {
        List<MontoPorCanalResponse> montoPorCanalResponses = new ArrayList<>();

        List<Collection> collections = collectionRepository.findAll();
        for(Collection c: collections){
            List<DebtAssignment> debtAssignments = debtAssignmentRepository.findAllByCobranza_Id(c.getId());
            MontoPorCanalResponse montoPorCanalResponse = new MontoPorCanalResponse();
            Double totalMonto = 0.0;
            for(DebtAssignment da: debtAssignments){
                totalMonto += da.getDebt().getMontoInicial();
            }
            montoPorCanalResponse.setCanal(c.getNombre());
            montoPorCanalResponse.setTotalMonto(totalMonto);
            montoPorCanalResponses.add(montoPorCanalResponse);
        }
        return montoPorCanalResponses;
    }

}
