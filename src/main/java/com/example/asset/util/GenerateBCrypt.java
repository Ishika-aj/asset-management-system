package com.example.asset.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class GenerateBCrypt {
    public static void main(String[] args) {
        // If an argument is passed, use it; else default to "mypassword"
        String password = (args.length > 0) ? args[0] : "mypassword";

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String hashedPassword = encoder.encode(password);

        System.out.println("Plaintext: " + password);
        System.out.println("BCrypt hash: " + hashedPassword);
    }
}
