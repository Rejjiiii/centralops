package com.centralops.centralops_backend.service;

import com.centralops.centralops_backend.model.User;
import com.centralops.centralops_backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository repo;

    public UserService(UserRepository repo) {
        this.repo = repo;
    }

    public List<User> getAllUsers() {
        return repo.findAll();
    }

    public User saveUser(User user) {
        return repo.save(user);
    }

    public User getUserById(String empId) {
        return repo.findById(empId)
                .orElseThrow(() -> new RuntimeException("User not found with empId " + empId));
    }
}
