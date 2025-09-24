package com.centralops.centralops_backend.controller;

import com.centralops.centralops_backend.dto.LoginRequest;
import com.centralops.centralops_backend.dto.LoginResponse;
import com.centralops.centralops_backend.service.UserService;

import jakarta.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService service;

    public AuthController(UserService service) {
        this.service = service;
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request, HttpSession session) {
        return service.authenticate(request.getUsername(), request.getPassword())
                .map(user -> {
                    session.setAttribute("user", user);
                    return new LoginResponse(true, "Login successful!");
                })
                .orElse(new LoginResponse(false, "Invalid username or password"));
    }
}
