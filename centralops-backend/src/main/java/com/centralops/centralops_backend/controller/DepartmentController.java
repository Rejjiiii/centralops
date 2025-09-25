package com.centralops.centralops_backend.controller;

import com.centralops.centralops_backend.service.DepartmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dept")
public class DepartmentController {
    private final DepartmentService service;

    public DepartmentController(DepartmentService service) {
        this.service = service;
    }

    @GetMapping("/{deptId}")
    public ResponseEntity<?> getDepartment(@PathVariable Long deptId) {
        return service.getDepartmentById(deptId)
                .map(dept -> ResponseEntity.ok().body(dept.getDeptName()))
                .orElse(ResponseEntity.notFound().build());
    }
}
