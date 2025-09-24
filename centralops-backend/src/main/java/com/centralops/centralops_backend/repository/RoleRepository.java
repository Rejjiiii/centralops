package com.centralops.centralops_backend.repository;

import com.centralops.centralops_backend.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
}
