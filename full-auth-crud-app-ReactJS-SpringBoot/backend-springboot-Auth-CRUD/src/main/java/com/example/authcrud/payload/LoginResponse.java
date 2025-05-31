// src/main/java/com/example/authcrud/payload/LoginResponse.java

package com.example.authcrud.payload;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {
    private String token;
    private String email;
    private String role;
}
