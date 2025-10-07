package com.hrapp.hrapp.service;

import com.hrapp.hrapp.dto.AbsenceDTO;
import com.hrapp.hrapp.mapper.AbsenceMapper;
import com.hrapp.hrapp.model.Absence;
import com.hrapp.hrapp.repository.AbsenceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AbsenceService {

    private final AbsenceRepository absenceRepository;
    private final AbsenceMapper absenceMapper;

    public Absence createAbsence(AbsenceDTO absencedto) {
        Absence entity = absenceMapper.toEntity(absencedto);
        return absenceRepository.save(entity);
    }

}