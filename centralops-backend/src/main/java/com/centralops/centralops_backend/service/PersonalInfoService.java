package com.centralops.centralops_backend.service;

import com.centralops.centralops_backend.model.PersonalInfo;
import com.centralops.centralops_backend.repository.PersonalInfoRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PersonalInfoService {
    private final PersonalInfoRepository repo;

    public PersonalInfoService(PersonalInfoRepository repo) {
        this.repo = repo;
    }

    public Optional<PersonalInfo> getPersonalInfoByEmpId(String empId) {
        return repo.findById(empId);
    }
}
