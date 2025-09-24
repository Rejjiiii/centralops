package com.centralops.centralops_backend.repository;

import com.centralops.centralops_backend.model.PersonalInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonalInfoRepository extends JpaRepository<PersonalInfo, String> {
}
