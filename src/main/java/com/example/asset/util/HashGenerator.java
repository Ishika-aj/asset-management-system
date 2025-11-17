package com.example.asset.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class HashGenerator {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        
        // Replace "mypassword" with the password you want to hash
        String rawPassword = "mypassword"; 
        String encodedPassword = encoder.encode(rawPassword);
        
        System.out.println("BCrypt Hash: " + encodedPassword);
    }
}
