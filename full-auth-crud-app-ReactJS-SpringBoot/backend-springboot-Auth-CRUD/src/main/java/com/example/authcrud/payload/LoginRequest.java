// src/main/java/com/example/authcrud/payload/LoginRequest.java

package com.example.authcrud.payload;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}
