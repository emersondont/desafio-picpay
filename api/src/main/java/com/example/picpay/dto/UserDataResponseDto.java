package com.example.picpay.dto;

import java.math.BigDecimal;

public record UserDataResponseDto(String fullName, String email, BigDecimal balance) {
}
