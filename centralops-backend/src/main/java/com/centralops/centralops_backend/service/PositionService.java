package com.centralops.centralops_backend.service;

import com.centralops.centralops_backend.model.Position;
import com.centralops.centralops_backend.repository.PositionRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PositionService {
    private final PositionRepository repo;

    public PositionService(PositionRepository repo) {
        this.repo = repo;
    }

    public Optional<Position> getPositionById(Long positionId) {
        return repo.findById(positionId);
    }
}
