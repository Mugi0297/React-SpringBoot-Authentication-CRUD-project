// dto/EmployeeDTO.java
package com.example.authcrud.dto;

import lombok.Data;

@Data
public class EmployeeDTO {
    private Long id;
    private String name;
    private String department;
    private String position;
    private Double salary;
    private String createdByEmail; // Optional (you can skip this if not needed)
}
