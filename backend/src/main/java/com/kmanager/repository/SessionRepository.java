package com.kmanager.repository;

import com.kmanager.entity.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface SessionRepository extends JpaRepository<Session, UUID> {
    List<Session> findByVenueIdAndStatus(UUID venueId, Session.SessionStatus status);
    List<Session> findByVenueIdAndStatusAndStartedAtBetween(UUID venueId, Session.SessionStatus status, LocalDateTime start, LocalDateTime end);
    List<Session> findByRoomIdAndStatus(UUID roomId, Session.SessionStatus status);
}
