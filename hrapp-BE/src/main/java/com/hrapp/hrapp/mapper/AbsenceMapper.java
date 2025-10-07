package com.hrapp.hrapp.mapper;

import com.hrapp.hrapp.dto.AbsenceDTO;
import com.hrapp.hrapp.model.Absence;
import com.hrapp.hrapp.repository.CredentialsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class AbsenceMapper {

    private final CredentialsRepository credentialsRepository;

    public Absence toEntity(AbsenceDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Absence absence = new Absence();
        if ( dto.startDate() != null ) {
            absence.setStartDate( dto.startDate() );
        }
        if ( dto.endDate() != null ) {
            absence.setEndDate( dto.endDate() );
        }
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        absence.setEmployee(credentialsRepository.findByUsername(auth.getName()).getEmployee());

        return absence;
    }

    public AbsenceDTO toDto(Absence entity) {
        if ( entity == null ) {
            return null;
        }

        return new AbsenceDTO(
                entity.getUuid(),
                entity.getStartDate(),
                entity.getEndDate()
        );
    }

}