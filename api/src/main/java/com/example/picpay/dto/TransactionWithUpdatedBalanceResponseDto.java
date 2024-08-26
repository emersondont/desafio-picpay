package com.example.picpay.dto;

import java.math.BigDecimal;

public record TransactionWithUpdatedBalanceResponseDto(TransactionResponseDto transactionResponseDtoDto,
                                                       BigDecimal updatedBalance) {
}
