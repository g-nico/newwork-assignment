package com.hrapp.hrapp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;

import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Entity
public class Credentials {

    @Id
    @UuidGenerator
    private UUID uuid;

    @Column(unique = true)
    private String username;

    private String password;

    @Enumerated(EnumType.STRING)
    private Authority authority;

    @OneToOne
    @JoinColumn(name = "employee_uuid", referencedColumnName = "uuid")
    private Employee employee;

}
