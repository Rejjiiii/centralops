package com.centralops.centralops_backend.controller;

import com.centralops.centralops_backend.dto.LoginRequest;
import com.centralops.centralops_backend.dto.LoginResponse;
import com.centralops.centralops_backend.model.User;
import com.centralops.centralops_backend.service.UserService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserService service;

    public AuthController(UserService service) {
        this.service = service;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        User user = service.authenticate(request.getUsername(), request.getPassword());

        if (user != null) {
            return ResponseEntity.ok(
                new LoginResponse("Login successful", user.getEmpId(),
                        user.getRoleId() != null ? user.getRoleId().toString() : null)
            );
        } else {
            return ResponseEntity.status(401).body(new LoginResponse("Invalid credentials", null, null));
        }
    }
}
