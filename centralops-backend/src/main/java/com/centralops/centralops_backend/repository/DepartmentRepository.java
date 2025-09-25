package com.centralops.centralops_backend.repository;

import com.centralops.centralops_backend.model.Department;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
}
