package com.kmanager.repository;

import com.kmanager.entity.Bill;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface BillRepository extends JpaRepository<Bill, UUID> {
    List<Bill> findByVenueIdAndCreatedAtBetweenOrderByCreatedAtDesc(UUID venueId, LocalDateTime start, LocalDateTime end);
    Optional<Bill> findBySessionId(UUID sessionId);
    long countByVenueIdAndCreatedAtBetween(UUID venueId, LocalDateTime start, LocalDateTime end);
}
