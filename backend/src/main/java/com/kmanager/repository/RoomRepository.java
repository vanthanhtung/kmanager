package com.kmanager.repository;

import com.kmanager.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface RoomRepository extends JpaRepository<Room, UUID> {
    List<Room> findByVenueIdOrderByRoomNumber(UUID venueId);
    List<Room> findByVenueIdAndStatus(UUID venueId, Room.RoomStatus status);
    boolean existsByVenueIdAndRoomNumber(UUID venueId, String roomNumber);
    long countByVenueId(UUID venueId);
    long countByVenueIdAndStatus(UUID venueId, Room.RoomStatus status);
}
