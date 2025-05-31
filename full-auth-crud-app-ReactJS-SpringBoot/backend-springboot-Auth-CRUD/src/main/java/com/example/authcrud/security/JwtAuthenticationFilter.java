package com.example.authcrud.security;

import com.example.authcrud.model.User;
import com.example.authcrud.repository.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import io.jsonwebtoken.JwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (StringUtils.hasText(authHeader) && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);

            try {
                System.out.println("🔐 Received token: " + token);

                if (jwtUtil.validateToken(token) && SecurityContextHolder.getContext().getAuthentication() == null) {
                    String email = jwtUtil.getEmailFromToken(token);
                    System.out.println("✅ Authenticated email: " + email);

                    Optional<User> optionalUser = userRepository.findByEmail(email);

                    if (optionalUser.isPresent()) {
                        User user = optionalUser.get();

                        // ✅ Wrap user in UserPrincipal (implements UserDetails)
                        UserPrincipal userPrincipal = new UserPrincipal(user);

                        System.out.println("🎯 Granted Authorities: " + userPrincipal.getAuthorities());

                        UsernamePasswordAuthenticationToken authentication =
                                new UsernamePasswordAuthenticationToken(userPrincipal, null, userPrincipal.getAuthorities());
                        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                        SecurityContextHolder.getContext().setAuthentication(authentication);
                        System.out.println("🔒 Spring Security Auth set for: " + user.getEmail());
                    } else {
                        System.out.println("⚠️ No user found for email: " + email);
                    }
                } else {
                    System.out.println("❌ Token validation failed or user already authenticated.");
                }
            } catch (JwtException e) {
                System.out.println("❌ Invalid JWT: " + e.getMessage());
            }
        } else {
            System.out.println("⚠️ No valid Bearer token in Authorization header.");
        }

        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        System.out.println("📥 Request Method: " + request.getMethod() + " | URI: " + request.getRequestURI());
        return false;
    }
}
