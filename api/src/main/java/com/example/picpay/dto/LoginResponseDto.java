package com.example.picpay.dto;

import java.math.BigDecimal;

public record LoginResponseDto(String token, String fullName, String email, BigDecimal balance) {
}
