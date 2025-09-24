package com.centralops.centralops_backend.controller;

import com.centralops.centralops_backend.service.PositionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pos")
public class PositionController {
    private final PositionService service;

    public PositionController(PositionService service) {
        this.service = service;
    }

    @GetMapping("/{positionId}")
    public ResponseEntity<?> getPosition(@PathVariable Long positionId) {
        return service.getPositionById(positionId)
                .map(pos -> ResponseEntity.ok().body(pos.getPositionName()))
                .orElse(ResponseEntity.notFound().build());
    }
}
