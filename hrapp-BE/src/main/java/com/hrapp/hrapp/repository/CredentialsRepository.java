package com.hrapp.hrapp.repository;

import com.hrapp.hrapp.model.Credentials;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.UUID;

public interface CredentialsRepository extends JpaRepository<Credentials, UUID> {

    Credentials findByUsername(String username);

    @Query("SELECT c.employee.uuid FROM Credentials c WHERE c.username = ?1")
    UUID findEmployeeUUIDByUsername(String username);
}
