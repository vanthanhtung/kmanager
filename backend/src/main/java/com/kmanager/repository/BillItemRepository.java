package com.kmanager.repository;

import com.kmanager.entity.BillItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface BillItemRepository extends JpaRepository<BillItem, UUID> {
    List<BillItem> findBySessionId(UUID sessionId);
}
