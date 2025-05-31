// mapper/EmployeeMapper.java
package com.example.authcrud.mapper;

import com.example.authcrud.dto.EmployeeDTO;
import com.example.authcrud.model.Employee;

public class EmployeeMapper {

    public static EmployeeDTO toDTO(Employee emp) {
        EmployeeDTO dto = new EmployeeDTO();
        dto.setId(emp.getId());
        dto.setName(emp.getName());
        dto.setDepartment(emp.getDepartment());
        dto.setPosition(emp.getPosition());
        dto.setSalary(emp.getSalary());

        if (emp.getCreatedBy() != null) {
            dto.setCreatedByEmail(emp.getCreatedBy().getEmail());
        }

        return dto;
    }
}
