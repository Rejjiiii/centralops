package com.centralops.centralops_backend.repository;

import com.centralops.centralops_backend.model.Position;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PositionRepository extends JpaRepository<Position, Long> {
}
