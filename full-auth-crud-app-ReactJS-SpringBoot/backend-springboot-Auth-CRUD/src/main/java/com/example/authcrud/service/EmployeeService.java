package com.example.authcrud.service;

import com.example.authcrud.model.Employee;
import com.example.authcrud.model.User;

import java.util.List;
import java.util.Optional;

public interface EmployeeService {
    Employee createEmployee(Employee employee, User user);
    List<Employee> getEmployeesByUser(User user);
    Optional<Employee> getEmployeeById(Long id, User user);
    Employee updateEmployee(Long id, Employee updated, User user);
    void deleteEmployee(Long id, User user);
}
