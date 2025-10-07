package com.hrapp.hrapp.dto;

import java.time.LocalDate;
import java.util.UUID;

public record AbsenceDTO(UUID uuid, LocalDate startDate, LocalDate endDate) {
}
