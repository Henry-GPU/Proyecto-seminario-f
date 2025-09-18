package com.management.mysql.system.status;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StatusService {

    @Autowired
    private StatusRepository statusRepository;
    
    public Status createStatus(String request){
        Status status = new Status();
        status.setDescripcion(request);
        return statusRepository.save(status);
    }

    public List<Status> getAllStatus(){
        return statusRepository.findAll();
    }

    public Status getStatusById(Integer id){
        return statusRepository.findById(id).orElse(null);
    }
}
