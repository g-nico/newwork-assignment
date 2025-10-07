package com.hrapp.hrapp.repository;

import com.hrapp.hrapp.model.Absence;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AbsenceRepository extends JpaRepository<Absence, UUID> {
}
