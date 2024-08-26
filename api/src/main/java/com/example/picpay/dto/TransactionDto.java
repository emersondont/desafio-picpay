package com.example.picpay.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record TransactionDto(@DecimalMin("0.01") @NotNull BigDecimal value,
                             @NotBlank String payeeDocumentOrEmail) {
}
