package com.centralops.centralops_backend.controller;

import com.centralops.centralops_backend.dto.LoginRequest;
import com.centralops.centralops_backend.dto.LoginResponse;
<<<<<<< HEAD
import com.centralops.centralops_backend.service.UserService;
=======
import com.centralops.centralops_backend.model.User;
import com.centralops.centralops_backend.service.UserService;
import org.springframework.http.ResponseEntity;
>>>>>>> 3eeab876261d9af5234859a4feede7c0d299d9b3
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
<<<<<<< HEAD

    private final UserService service;

    public AuthController(UserService service) {
        this.service = service;
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return service.authenticate(request.getUsername(), request.getPassword())
                .map(user -> new LoginResponse(true, "Login successful!"))
                .orElse(new LoginResponse(false, "Invalid username or password"));
=======
    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        User user = userService.authenticate(request.getUsername(), request.getPassword());

        if (user != null) {
            return ResponseEntity.ok(
                new LoginResponse("Login successful", user.getEmpId(),
                        user.getRoleId() != null ? user.getRoleId().toString() : null)
            );
        } else {
            return ResponseEntity.status(401).body(new LoginResponse("Invalid credentials", null, null));
        }
>>>>>>> 3eeab876261d9af5234859a4feede7c0d299d9b3
    }
}
