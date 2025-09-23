package com.centralops.centralops_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.centralops.centralops_backend.model.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByUsername(String username);
}
