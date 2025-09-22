package com.centralops.centralops_backend.controller;

import com.centralops.centralops_backend.model.User;
import com.centralops.centralops_backend.service.UserService;

import java.util.List;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping
    public List<User> getAll() {
        return service.getAllUsers();
    }

    @PostMapping
    public User create(@RequestBody User user) {
        return service.saveUser(user);
    }

    @GetMapping("/{empId}")
    public User getUserById(@PathVariable Long empId) {
        return service.getUserById(empId);
    }
}