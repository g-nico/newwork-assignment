package com.hrapp.hrapp.controller;

import com.hrapp.hrapp.dto.EmployeeDTO;
import com.hrapp.hrapp.mapper.EmployeeMapper;
import com.hrapp.hrapp.model.Employee;
import com.hrapp.hrapp.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/employees")
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;
    private final EmployeeMapper employeeMapper;

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeDTO> getEmployeeById(@PathVariable UUID id)  {
        Optional<EmployeeDTO> employee = employeeService.getEmployeeById(id).map(employeeMapper::toEmployeeDTO);
        return employee.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<EmployeeDTO>> getAllEmployees() {
        List<Employee> employees = employeeService.getAllEmployees();
        List<EmployeeDTO> employeeDTOs = employeeMapper.toEmployeeDTOs(employees);
        return ResponseEntity.ok(employeeDTOs);
    }

    @Secured(value = "ROLE_ADMIN")
    @PostMapping
    public ResponseEntity<EmployeeDTO> createEmployee(@RequestBody EmployeeDTO employee) {
        Employee created = employeeService.createEmployee(employeeMapper.toEmployee(employee));
        return ResponseEntity.ok(employeeMapper.toEmployeeDTO(created));
    }

    @Secured(value = "ROLE_ADMIN")
    @PutMapping("/{id}")
    public ResponseEntity<EmployeeDTO> updateEmployee(@PathVariable UUID id, @RequestBody EmployeeDTO updatedEmployee) {
        Optional<EmployeeDTO> employee = employeeService.updateEmployee(id, employeeMapper.toEmployee(updatedEmployee))
                .map(employeeMapper::toEmployeeDTO);
        return employee.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Secured(value = "ROLE_ADMIN")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable UUID id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity.noContent().build();
    }
    
}