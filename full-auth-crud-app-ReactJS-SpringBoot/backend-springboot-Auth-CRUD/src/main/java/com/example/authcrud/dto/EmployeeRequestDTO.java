package com.example.authcrud.dto;

import lombok.Data;

@Data
public class EmployeeRequestDTO {
    private String name;
    private String department;
    private String position;
    private Double salary;
}
