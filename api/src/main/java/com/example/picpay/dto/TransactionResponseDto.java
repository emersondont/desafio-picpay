package com.example.picpay.dto;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public record TransactionResponseDto (Long id,
                                      BigDecimal value,
                                      UserResponseDto payer,
                                      UserResponseDto payee,
                                      LocalDateTime timestamp) {
}

