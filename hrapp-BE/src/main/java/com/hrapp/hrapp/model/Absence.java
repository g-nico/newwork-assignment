package com.hrapp.hrapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDate;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Absence {

    @Id
    @UuidGenerator
    private UUID uuid;

    @ManyToOne
    @JoinColumn(name = "employee_uuid", referencedColumnName = "uuid")
    private Employee employee;

    private LocalDate startDate;

    private LocalDate endDate;

}
