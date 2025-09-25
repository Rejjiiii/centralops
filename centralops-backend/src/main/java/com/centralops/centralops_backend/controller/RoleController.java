package com.centralops.centralops_backend.controller;

import com.centralops.centralops_backend.service.RoleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/role")
public class RoleController {
    private final RoleService service;

    public RoleController(RoleService service) {
        this.service = service;
    }

    @GetMapping("/{roleId}")
    public ResponseEntity<?> getRole(@PathVariable Long roleId) {
        return service.getRoleById(roleId)
                .map(role -> ResponseEntity.ok().body(role.getRoleName()))
                .orElse(ResponseEntity.notFound().build());
    }
}
