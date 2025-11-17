package com.example.asset.controller;

import com.example.asset.dto.UserResponse;
import com.example.asset.model.User;
import com.example.asset.payload.ApiResponse;
import com.example.asset.payload.LoginRequest;
import com.example.asset.payload.LoginResponse;
import com.example.asset.payload.RegisterRequest;
import com.example.asset.repository.UserRepository;
import com.example.asset.security.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    // ========================= REGISTER =========================
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<UserResponse>> register(@Valid @RequestBody RegisterRequest request) {
        try {
            String username = request.getUsername().trim().toLowerCase();
            String email = request.getEmail().trim().toLowerCase();

            // Check for duplicates
            if (userRepository.existsByUsername(username)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new ApiResponse<>(false, "Username already exists", null));
            }
            if (userRepository.existsByEmail(email)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new ApiResponse<>(false, "Email already exists", null));
            }

            // Create new user
            User user = new User(
                    username,
                    request.getFullName(),
                    email,
                    passwordEncoder.encode(request.getPassword()),
                    request.getRole()
            );

            User savedUser = userRepository.save(user);

            // Convert to DTO for response
            UserResponse response = new UserResponse(
                    savedUser.getId(),
                    savedUser.getUsername(),
                    savedUser.getFullName(),
                    savedUser.getEmail(),
                    savedUser.getRole()
            );

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponse<>(true, "User registered successfully", response));

        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse<>(false, "Duplicate entry detected", null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(false, "An error occurred: " + e.getMessage(), null));
        }
    }

    // ========================= LOGIN =========================
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@Valid @RequestBody LoginRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername().trim().toLowerCase(),
                            request.getPassword()
                    )
            );

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String token = jwtUtil.generateToken(userDetails.getUsername());

            LoginResponse loginResponse = new LoginResponse(token, userDetails.getUsername(), "Login successful");

            return ResponseEntity.ok(new ApiResponse<>(true, "Login successful", loginResponse));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse<>(false, "Invalid username or password", null));
        }
    }

    // ========================= DELETE USER BY ID =========================
    @DeleteMapping("/delete/id/{id}")
    public ResponseEntity<ApiResponse<?>> deleteById(@PathVariable Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse<>(false, "User with ID " + id + " not found"));
        }
        userRepository.deleteById(id);
        return ResponseEntity.ok(new ApiResponse<>(true, "User deleted successfully", null));
    }

    // ========================= DELETE USER BY USERNAME =========================
    @DeleteMapping("/delete/username/{username}")
    public ResponseEntity<ApiResponse<?>> deleteByUsername(@PathVariable String username) {
        Optional<User> user = userRepository.findByUsername(username.trim().toLowerCase());
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse<>(false, "User with username '" + username + "' not found"));
        }
        userRepository.delete(user.get());
        return ResponseEntity.ok(new ApiResponse<>(true, "User deleted successfully", null));
    }

    // ========================= UPDATE USER =========================
    @PutMapping("/update/{id}")
    public ResponseEntity<ApiResponse<?>> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody RegisterRequest request
    ) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse<>(false, "User not found", null));
        }

        User user = optionalUser.get();
        String newUsername = request.getUsername().trim().toLowerCase();
        String newEmail = request.getEmail().trim().toLowerCase();

        // Check for duplicates if changing username/email
        if (!user.getUsername().equals(newUsername) && userRepository.existsByUsername(newUsername)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse<>(false, "Username already exists", null));
        }
        if (!user.getEmail().equals(newEmail) && userRepository.existsByEmail(newEmail)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse<>(false, "Email already exists", null));
        }

        user.setUsername(newUsername);
        user.setEmail(newEmail);
        user.setFullName(request.getFullName());
        user.setRole(request.getRole());
        userRepository.save(user);

        return ResponseEntity.ok(new ApiResponse<>(true, "User updated successfully", null));
    }
}
