package com.management.mysql.system.collectionActions;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CollectionActionRepository extends JpaRepository<CollectionAction, Integer> {
    
    
}
