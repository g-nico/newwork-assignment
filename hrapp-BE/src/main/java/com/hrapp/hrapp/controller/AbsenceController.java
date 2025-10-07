package com.hrapp.hrapp.controller;

import com.hrapp.hrapp.dto.AbsenceDTO;
import com.hrapp.hrapp.mapper.AbsenceMapper;
import com.hrapp.hrapp.model.Absence;
import com.hrapp.hrapp.service.AbsenceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/absences")
@RequiredArgsConstructor
public class AbsenceController {

    private final AbsenceService absenceService;
    private final AbsenceMapper absenceMapper;

    @PostMapping
    public ResponseEntity<AbsenceDTO> createAbsence(@RequestBody AbsenceDTO absenceDTO) {
        Absence absence = absenceService.createAbsence(absenceDTO);
        return ResponseEntity.ok(absenceMapper.toDto(absence));
    }
    
}