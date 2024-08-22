package com.example.picpay.controller;

import com.example.picpay.dto.TransactionDto;
import com.example.picpay.dto.TransactionResponseDto;
import com.example.picpay.dto.UserResponseDto;
import com.example.picpay.entity.Transaction;
import com.example.picpay.service.TransactionService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TransactionController {
    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping("/transfer")
    public ResponseEntity<TransactionResponseDto> transfer(@RequestBody @Valid TransactionDto transactionDto) {
        var res = transactionService.transfer(transactionDto);

        return ResponseEntity.ok(res);
    }
}
