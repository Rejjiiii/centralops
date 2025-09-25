package com.centralops.centralops_backend.service;

import com.centralops.centralops_backend.model.Section;
import com.centralops.centralops_backend.repository.SectionRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SectionService {
    private final SectionRepository repo;

    public SectionService(SectionRepository repo) {
        this.repo = repo;
    }

    public Optional<Section> getSectionById(Long sectionId) {
        return repo.findById(sectionId);
    }
}
