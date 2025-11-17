package com.example.asset.controller;

import com.example.asset.dto.UserResponse;
import com.example.asset.model.User;
import com.example.asset.payload.ApiResponse;
import com.example.asset.payload.CreateUserRequest;
import com.example.asset.service.UserService;
import com.example.asset.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // ========================== GET ALL USERS ==========================
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<ApiResponse<List<UserResponse>>> getAllUsers() {
        List<UserResponse> users = userService.getAllUsers();
        return ResponseEntity.ok(new ApiResponse<>(true, "Users fetched successfully", users));
    }

    // ========================== GET USER BY ID ==========================
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UserResponse>> getUserById(@PathVariable Long id) {
        UserResponse user = userService.getUserById(id);
        return ResponseEntity.ok(new ApiResponse<>(true, "User fetched successfully", user));
    }

    // ========================== DELETE USER ==========================
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteUser(@PathVariable Long id) {
        boolean deleted = userService.deleteUserById(id);

        if (deleted) {
            return ResponseEntity.ok(new ApiResponse<>(true, "User deleted successfully"));
        } else {
            return ResponseEntity.status(404)
                    .body(new ApiResponse<>(false, "User not found"));
        }
    }

    // ========================== ADD USER (EMPLOYEE / ADMIN) ==========================
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<ApiResponse<UserResponse>> createUser(
            @Valid @RequestBody CreateUserRequest request) {

        String username = request.getUsername().trim().toLowerCase();
        String email = request.getEmail().trim().toLowerCase();

        // Duplicate Checks
        if (userRepository.existsByUsername(username)) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(false, "Username already exists"));
        }

        if (userRepository.existsByEmail(email)) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(false, "Email already exists"));
        }

        // Create user
        User user = new User(
                username,
                request.getFullName(),
                email,
                passwordEncoder.encode(request.getPassword()),
                request.getRole()
        );

        userRepository.save(user);

        UserResponse response = new UserResponse(
                user.getId(),
                user.getUsername(),
                user.getFullName(),
                user.getEmail(),
                user.getRole()
        );

        return ResponseEntity.ok(
                new ApiResponse<>(true, "User added successfully", response)
        );
    }
}
