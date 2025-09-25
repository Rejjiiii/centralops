package com.centralops.centralops_backend.controller;

import com.centralops.centralops_backend.dto.LoginRequest;
import com.centralops.centralops_backend.dto.LoginResponse;
import com.centralops.centralops_backend.model.User;
import com.centralops.centralops_backend.service.PersonalInfoService;
import com.centralops.centralops_backend.service.UserService;

import jakarta.servlet.http.HttpSession;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserService service;
    private final PersonalInfoService personalInfoService;

    public AuthController(UserService service, PersonalInfoService personalInfoService) {
        this.service = service;
        this.personalInfoService = personalInfoService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request, HttpSession session) {
        User user = service.authenticate(request.getUsername(), request.getPassword());

        if (user != null) {
            session.setAttribute("currentUser", user); // store in session

            // Fetch personal info using empId and store in session
            personalInfoService.getPersonalInfoByEmpId(user.getEmpId())
                    .ifPresent(info -> session.setAttribute("personalInfo", info));

            return ResponseEntity.ok(
                    new LoginResponse(true, "Login successful", user.getEmpId(),
                            user.getRoleId() != null ? user.getRoleId().toString() : null));
        } else {
            return ResponseEntity.status(401).body(new LoginResponse(false, "Invalid credentials", null, null));
        }
    }
}
