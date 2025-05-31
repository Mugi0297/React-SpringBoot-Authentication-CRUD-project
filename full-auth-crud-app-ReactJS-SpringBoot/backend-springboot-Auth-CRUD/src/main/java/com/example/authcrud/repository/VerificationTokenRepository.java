// src/main/java/com/example/authcrud/repository/VerificationTokenRepository.java

package com.example.authcrud.repository;

import com.example.authcrud.model.VerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VerificationTokenRepository extends JpaRepository<VerificationToken, Long> {
    Optional<VerificationToken> findByToken(String token);
}
