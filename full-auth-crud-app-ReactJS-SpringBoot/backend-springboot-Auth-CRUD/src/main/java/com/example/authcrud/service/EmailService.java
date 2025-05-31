package com.example.authcrud.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${app.frontend-url}")
    private String frontendUrl;

    public void sendVerificationEmail(String toEmail, String token) {
        String subject = "Email Verification";
        String body = "Click the link to verify your email:\n" +
                frontendUrl + "/verify-email?token=" + token;

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);
            message.setSubject(subject);
            message.setText(body);
            mailSender.send(message);
            System.out.println("✅ Verification email sent to " + toEmail);
        } catch (Exception e) {
            System.err.println("❌ Failed to send verification email: " + e.getMessage());
        }
    }
}
