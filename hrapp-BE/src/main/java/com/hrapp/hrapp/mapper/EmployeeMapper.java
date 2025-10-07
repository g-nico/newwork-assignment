package com.hrapp.hrapp.mapper;

import com.hrapp.hrapp.dto.EmployeeDTO;
import com.hrapp.hrapp.model.Employee;
import com.hrapp.hrapp.repository.CredentialsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Component
public class EmployeeMapper {

    private final CredentialsRepository credentialsRepository;

    private boolean isAdmin(Authentication auth) {
        return auth.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
    }

    private boolean isMySalary(Authentication auth, UUID uuid) {
        return credentialsRepository.findEmployeeUUIDByUsername(auth.getName()).equals(uuid);
    }

    public Employee toEmployee(EmployeeDTO employeeDTO) {
        if ( employeeDTO == null ) {
            return null;
        }

        Employee.EmployeeBuilder employee = Employee.builder();

        employee.uuid( employeeDTO.uuid() );
        employee.name( employeeDTO.name() );
        employee.role( employeeDTO.role() );
        if (employeeDTO.salary() != null) {
            employee.salary(employeeDTO.salary());
        }

        return employee.build();
    }

    public EmployeeDTO toEmployeeDTO(Employee employee) {
        if ( employee == null ) {
            return null;
        }

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        var uuid = employee.getUuid();
        var name = employee.getName();
        var salary = isAdmin(auth) || isMySalary(auth, uuid) ? employee.getSalary() : null;
        var role = employee.getRole();

        return new EmployeeDTO( uuid, name, role, salary );
    }

    public List<EmployeeDTO> toEmployeeDTOs(List<Employee> employees) {
        if ( employees == null ) {
            return null;
        }

        List<EmployeeDTO> list = new ArrayList<EmployeeDTO>( employees.size() );
        for ( Employee employee : employees ) {
            list.add( toEmployeeDTO( employee ) );
        }

        return list;
    }
}
