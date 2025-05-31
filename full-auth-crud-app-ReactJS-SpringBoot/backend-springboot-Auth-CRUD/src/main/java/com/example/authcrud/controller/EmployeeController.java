package com.example.authcrud.controller;

import com.example.authcrud.dto.EmployeeDTO;
import com.example.authcrud.dto.EmployeeRequestDTO;
import com.example.authcrud.mapper.EmployeeMapper;
import com.example.authcrud.model.Employee;
import com.example.authcrud.model.User;
import com.example.authcrud.security.CurrentUser;
import com.example.authcrud.security.UserPrincipal;
import com.example.authcrud.service.EmployeeService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@SecurityRequirement(name = "bearer-key")
@RestController
@RequestMapping("/api/employees")
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;

    @PostMapping
    public ResponseEntity<EmployeeDTO> createEmployee(@RequestBody EmployeeRequestDTO dto,
                                                      @CurrentUser UserPrincipal userPrincipal) {
        if (userPrincipal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Employee employee = Employee.builder()
                .name(dto.getName())
                .department(dto.getDepartment())
                .position(dto.getPosition())
                .salary(dto.getSalary())
                .build();

        Employee saved = employeeService.createEmployee(employee, userPrincipal.getUser());
        return ResponseEntity.ok(EmployeeMapper.toDTO(saved));
    }

    @GetMapping
    public ResponseEntity<List<EmployeeDTO>> getEmployees(@CurrentUser UserPrincipal userPrincipal) {
        if (userPrincipal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        List<Employee> employees = employeeService.getEmployeesByUser(userPrincipal.getUser());
        List<EmployeeDTO> dtoList = employees.stream().map(EmployeeMapper::toDTO).toList();

        return ResponseEntity.ok(dtoList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeDTO> getEmployee(@PathVariable Long id,
                                                   @CurrentUser UserPrincipal userPrincipal) {
        if (userPrincipal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Optional<Employee> empOpt = employeeService.getEmployeeById(id, userPrincipal.getUser());
        return empOpt.map(emp -> ResponseEntity.ok(EmployeeMapper.toDTO(emp)))
                     .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmployeeDTO> updateEmployee(@PathVariable Long id,
                                                      @RequestBody EmployeeRequestDTO dto,
                                                      @CurrentUser UserPrincipal userPrincipal) {
        if (userPrincipal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Employee updated = Employee.builder()
                .name(dto.getName())
                .department(dto.getDepartment())
                .position(dto.getPosition())
                .salary(dto.getSalary())
                .build();

        Employee saved = employeeService.updateEmployee(id, updated, userPrincipal.getUser());
        return ResponseEntity.ok(EmployeeMapper.toDTO(saved));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id,
                                               @CurrentUser UserPrincipal userPrincipal) {
        if (userPrincipal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        employeeService.deleteEmployee(id, userPrincipal.getUser());
        return ResponseEntity.noContent().build();
    }
}
