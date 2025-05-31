package com.example.authcrud.service.impl;

import com.example.authcrud.model.Employee;
import com.example.authcrud.model.User;
import com.example.authcrud.repository.EmployeeRepository;
import com.example.authcrud.service.EmployeeService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    @Override
    public Employee createEmployee(Employee employee, User createdBy) {
        employee.setCreatedBy(createdBy);
        return employeeRepository.save(employee);
    }

    @Override
    public List<Employee> getEmployeesByUser(User user) {
        List<Employee> employees = employeeRepository.findByCreatedBy(user);

        // ✅ Force lazy loading of createdBy to prevent ByteBuddy serialization issue
        employees.forEach(emp -> {
            if (emp.getCreatedBy() != null) {
                emp.getCreatedBy().getEmail(); // Initializes proxy object
            }
        });

        return employees;
    }

    @Override
    public Optional<Employee> getEmployeeById(Long id, User user) {
        return employeeRepository.findById(id)
                .filter(emp -> emp.getCreatedBy().getId().equals(user.getId()));
    }

    @Override
    public Employee updateEmployee(Long id, Employee updated, User user) {
        Employee existing = employeeRepository.findById(id)
                .filter(emp -> emp.getCreatedBy().getId().equals(user.getId()))
                .orElseThrow(() -> new RuntimeException("Employee not found or access denied"));

        existing.setName(updated.getName());
        existing.setDepartment(updated.getDepartment());
        existing.setPosition(updated.getPosition());
        existing.setSalary(updated.getSalary());

        return employeeRepository.save(existing);
    }

    @Override
    public void deleteEmployee(Long id, User user) {
        Employee existing = employeeRepository.findById(id)
                .filter(emp -> emp.getCreatedBy().getId().equals(user.getId()))
                .orElseThrow(() -> new RuntimeException("Employee not found or access denied"));

        employeeRepository.delete(existing);
    }
}
