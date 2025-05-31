package com.example.authcrud.repository;

import com.example.authcrud.model.Employee;
import com.example.authcrud.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    List<Employee> findByCreatedBy(User user);
}
