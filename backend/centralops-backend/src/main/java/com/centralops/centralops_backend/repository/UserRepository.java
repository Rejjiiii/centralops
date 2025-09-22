package com.centralops.centralops_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.centralops.centralops_backend.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

}
