package com.centralops.centralops_backend.service;

import com.centralops.centralops_backend.model.User;
import com.centralops.centralops_backend.repository.UserRepository;

import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository repo;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

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

    // ✅ Pagination support
    public Page<User> getUsersByPage(int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size); // Spring Data pages are 0-based
        return repo.findAll(pageable);
    }

    public long countUsers() {
        return repo.count();
    }

    // ✅ Get filtered users with pagination
    public List<User> getFilteredUsers(int page, int size, String search, String role) {
        Pageable pageable = PageRequest.of(page - 1, size);

        // Convert role string to Long
        Long roleId = null;
        if (role != null && !role.isEmpty()) {
            try {
                roleId = Long.valueOf(role); // ✅ expects numeric roleId
            } catch (NumberFormatException e) {
                roleId = null; // ignore invalid role
            }
        }

        return repo.findFilteredUsers(search, roleId, pageable);
    }

    // ✅ Count total filtered users
    public long countFilteredUsers(String search, String role) {
        Long roleId = null;
        if (role != null && !role.isEmpty()) {
            try {
                roleId = Long.valueOf(role);
            } catch (NumberFormatException e) {
                roleId = null;
            }
        }
        return repo.countFilteredUsers(search, roleId);
    }

    // Authenticate login
    public Optional<User> authenticate(String username, String rawPassword) {
        Optional<User> userOpt = repo.findByUsername(username);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (passwordEncoder.matches(rawPassword, user.getPassword())) {
                return Optional.of(user);
            }
        }
        return Optional.empty();
    }
}
