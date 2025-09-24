package com.centralops.centralops_backend.service;

import com.centralops.centralops_backend.model.Department;
import com.centralops.centralops_backend.repository.DepartmentRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DepartmentService {
    private final DepartmentRepository repo;

    public DepartmentService(DepartmentRepository repo) {
        this.repo = repo;
    }

    public Optional<Department> getDepartmentById(Long deptId) {
        return repo.findById(deptId);
    }
}
