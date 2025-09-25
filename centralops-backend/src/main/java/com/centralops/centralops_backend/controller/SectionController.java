package com.centralops.centralops_backend.controller;

import com.centralops.centralops_backend.service.SectionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sect")
public class SectionController {
    private final SectionService service;

    public SectionController(SectionService service) {
        this.service = service;
    }

    @GetMapping("/{sectionId}")
    public ResponseEntity<?> getSection(@PathVariable Long sectionId) {
        return service.getSectionById(sectionId)
                .map(sec -> ResponseEntity.ok().body(sec.getSectionName()))
                .orElse(ResponseEntity.notFound().build());
    }
}
