package com.example.picpay.dto;

import com.example.picpay.entity.UserType;

import java.math.BigDecimal;

public record UserDataResponseDto(String fullName, String email, BigDecimal balance, UserType userType) {
}
