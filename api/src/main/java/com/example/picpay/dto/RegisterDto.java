package com.example.picpay.dto;

import com.example.picpay.entity.User;
import com.example.picpay.entity.UserType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record RegisterDto(@NotBlank String fullName,
                          @NotBlank String document,
                          @NotBlank String email,
                          @NotBlank String password,
                          @NotNull UserType userType) {
    public User toUser(String encryptedPassword ) {
        return new User(
                fullName,
                document,
                email,
                encryptedPassword,
                userType
        );
    }
}
