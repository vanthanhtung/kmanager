package com.kmanager.repository;

import com.kmanager.entity.VenueManager;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.UUID;

public interface VenueManagerRepository extends JpaRepository<VenueManager, UUID> {
    Optional<VenueManager> findByUsername(String username);
    boolean existsByUsername(String username);
    Optional<VenueManager> findByVenueId(UUID venueId);
}
