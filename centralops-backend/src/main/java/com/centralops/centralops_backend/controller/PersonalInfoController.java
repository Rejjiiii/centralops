package com.centralops.centralops_backend.controller;

import com.centralops.centralops_backend.service.PersonalInfoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/per-info")
public class PersonalInfoController {
    private final PersonalInfoService service;

    public PersonalInfoController(PersonalInfoService service) {
        this.service = service;
    }

    @GetMapping("/{empId}")
    public ResponseEntity<?> getPersonalInfo(@PathVariable String empId) {
        return service.getPersonalInfoByEmpId(empId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
