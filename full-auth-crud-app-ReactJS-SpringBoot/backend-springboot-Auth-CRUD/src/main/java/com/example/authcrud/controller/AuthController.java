package com.example.authcrud.controller;

import com.example.authcrud.model.PasswordResetToken;
import com.example.authcrud.model.User;
import com.example.authcrud.model.VerificationToken;
import com.example.authcrud.payload.LoginRequest;
import com.example.authcrud.payload.LoginResponse;
import com.example.authcrud.repository.PasswordResetTokenRepository;
import com.example.authcrud.repository.UserRepository;
import com.example.authcrud.repository.VerificationTokenRepository;
import com.example.authcrud.security.JwtUtil;
import com.example.authcrud.service.EmailService;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final VerificationTokenRepository tokenRepository;
    private final PasswordResetTokenRepository passwordResetTokenRepo;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final JavaMailSender mailSender;

    @Value("${app.frontend-url}")
    private String frontendUrl;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        // ✅ Normalize role
        String role = user.getRole().toUpperCase();

        // ✅ Optional: Validate allowed roles
        if (!role.equals("USER") && !role.equals("ADMIN")) {
            return ResponseEntity.badRequest().body("Invalid role. Must be USER or ADMIN.");
        }

        user.setIsVerified(false);
        user.setRole(role);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        User savedUser = userRepository.save(user);

        String token = UUID.randomUUID().toString();
        VerificationToken verificationToken = new VerificationToken(
                token,
                savedUser,
                LocalDateTime.now().plusHours(24)
        );

        tokenRepository.save(verificationToken);
        emailService.sendVerificationEmail(savedUser.getEmail(), token);

        return ResponseEntity.ok("User registered. Please check your email for verification.");
    }

    @GetMapping("/verify-email")
    public ResponseEntity<?> verifyEmail(@RequestParam("token") String token) {
        Optional<VerificationToken> optionalToken = tokenRepository.findByToken(token);

        if (optionalToken.isEmpty() || optionalToken.get().getExpiryDate().isBefore(LocalDateTime.now())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid or expired token.");
        }

        User user = optionalToken.get().getUser();
        user.setIsVerified(true);
        userRepository.save(user);
        tokenRepository.delete(optionalToken.get());

        return ResponseEntity.ok("Email verified successfully.");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Optional<User> optionalUser = userRepository.findByEmail(loginRequest.getEmail());

        if (optionalUser.isEmpty() || !passwordEncoder.matches(loginRequest.getPassword(), optionalUser.get().getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials.");
        }

        User user = optionalUser.get();

        if (!user.getIsVerified()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email not verified.");
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole());

        return ResponseEntity.ok(new LoginResponse(token, user.getEmail(), user.getRole()));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");

        if (email == null || email.isBlank()) {
            return ResponseEntity.badRequest().body("Email is required.");
        }

        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found.");
        }

        User user = userOpt.get();
        String token = UUID.randomUUID().toString();
        LocalDateTime expiry = LocalDateTime.now().plusMinutes(30);
        PasswordResetToken resetToken = new PasswordResetToken(token, expiry, user);
        passwordResetTokenRepo.save(resetToken);

        String resetLink = frontendUrl + "/reset-password/" + token;
        String subject = "Reset Your Password";
        String body = "Click the link to reset your password: " + resetLink;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getEmail());
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);

        return ResponseEntity.ok("Password reset link sent to your email.");
    }

    @PostMapping("/reset-password/{token}")
    public ResponseEntity<?> resetPassword(@PathVariable String token, @RequestBody Map<String, String> request) {
        String newPassword = request.get("password");

        if (newPassword == null || newPassword.isBlank()) {
            return ResponseEntity.badRequest().body("Password is required.");
        }

        Optional<PasswordResetToken> tokenOpt = passwordResetTokenRepo.findByToken(token);
        if (tokenOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid or expired token.");
        }

        PasswordResetToken resetToken = tokenOpt.get();

        if (resetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            return ResponseEntity.badRequest().body("Token expired.");
        }

        User user = resetToken.getUser();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        passwordResetTokenRepo.delete(resetToken); // Invalidate token after use

        return ResponseEntity.ok("Password reset successful.");
    }
}
