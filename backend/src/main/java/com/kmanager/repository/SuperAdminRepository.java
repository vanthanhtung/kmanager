package com.kmanager.repository;

import com.kmanager.entity.SuperAdmin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface SuperAdminRepository extends JpaRepository<SuperAdmin, UUID> {
    Optional<SuperAdmin> findByUsername(String username);
}
