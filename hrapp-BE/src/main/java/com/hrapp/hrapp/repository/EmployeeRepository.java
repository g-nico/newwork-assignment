package com.hrapp.hrapp.repository;

import com.hrapp.hrapp.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface EmployeeRepository extends JpaRepository<Employee, UUID> {

}
