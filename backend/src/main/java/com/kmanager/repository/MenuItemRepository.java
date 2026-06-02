package com.kmanager.repository;

import com.kmanager.entity.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface MenuItemRepository extends JpaRepository<MenuItem, UUID> {
    List<MenuItem> findByVenueIdOrderByCode(UUID venueId);
    List<MenuItem> findByVenueIdAndIsActiveTrueOrderByCode(UUID venueId);
    List<MenuItem> findByVenueIdAndCategory_IdOrderByCode(UUID venueId, UUID categoryId);
    List<MenuItem> findByVenueIdAndIsActiveFalseOrderByCode(UUID venueId);
    boolean existsByVenueIdAndCode(UUID venueId, String code);
    long countByVenueId(UUID venueId);
}
