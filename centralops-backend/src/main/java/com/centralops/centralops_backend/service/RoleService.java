package com.centralops.centralops_backend.service;

import com.centralops.centralops_backend.model.Role;
import com.centralops.centralops_backend.repository.RoleRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoleService {
    private final RoleRepository repo;

    public RoleService(RoleRepository repo) {
        this.repo = repo;
    }

    public Optional<Role> getRoleById(Long roleId) {
        return repo.findById(roleId);
    }
}
