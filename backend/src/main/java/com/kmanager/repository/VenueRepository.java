package com.kmanager.repository;

import com.kmanager.entity.Venue;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface VenueRepository extends JpaRepository<Venue, UUID> {
    List<Venue> findByStatus(Venue.VenueStatus status);
    boolean existsByName(String name);
}
