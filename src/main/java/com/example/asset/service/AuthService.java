package com.example.asset.service;

import com.example.asset.model.User;
import com.example.asset.repository.UserRepository;
import com.example.asset.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    // Authenticate user and generate JWT
    public String login(String username, String rawPassword) {
        try {
            // 1. Authenticate using AuthenticationManager
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, rawPassword)
            );

            // 2. Generate JWT if authentication succeeds
            return jwtUtil.generateToken(username);

        } catch (BadCredentialsException e) {
            throw new RuntimeException("Invalid username or password");
        }
    }

    // Optional: Register new user with BCrypt password
    public User register(String username, String rawPassword, String fullName, String role) {
        User user = new User();
        user.setUsername(username);
        user.setFullName(fullName);
        user.setPassword(passwordEncoder.encode(rawPassword)); // hash password
        user.setEnabled(true);
        user.setRole(role);

        return userRepository.save(user);
    }
}
