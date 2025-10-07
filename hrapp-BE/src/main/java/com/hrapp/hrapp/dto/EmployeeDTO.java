package com.hrapp.hrapp.dto;


import com.hrapp.hrapp.model.Role;

import java.math.BigDecimal;
import java.util.UUID;

public record EmployeeDTO(UUID uuid, String name, Role role, BigDecimal salary) {
}