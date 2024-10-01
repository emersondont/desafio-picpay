package com.example.picpay.controller;

import com.example.picpay.dto.TransactionDto;
import com.example.picpay.dto.TransactionResponseDto;
import com.example.picpay.dto.TransactionWithUpdatedBalanceResponseDto;
import com.example.picpay.dto.UserResponseDto;
import com.example.picpay.entity.Transaction;
import com.example.picpay.entity.User;
import com.example.picpay.repository.TransactionRepository;
import com.example.picpay.repository.UserRepository;
import com.example.picpay.security.TokenService;
import com.example.picpay.service.TransactionService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
public class TransactionController {
    @Autowired
    TokenService tokenService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    TransactionRepository transactionRepository;

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping("/transfer")
    public ResponseEntity<TransactionWithUpdatedBalanceResponseDto> transfer(@RequestHeader(name="Authorization") @NotNull String token,
                                                                             @RequestBody @Valid TransactionDto transactionDto) {
        var email = tokenService.validateToken(token.replace("Bearer ", ""));
        var user = userRepository.findByEmail(email);
        var res = transactionService.transfer(user, transactionDto);

        return ResponseEntity.ok(res);
    }

    @GetMapping("/transfers")
    public ResponseEntity<List<TransactionResponseDto>> getAllTransfers(@RequestHeader(name="Authorization") @NotNull String token,
                                                                        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
                                                                        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        var email = tokenService.validateToken(token.replace("Bearer ", ""));
        var user = userRepository.findByEmail(email);
        var res = transactionService.getAllTransfers(user, startDate, endDate);

        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @GetMapping("/transfers/payer")
    public ResponseEntity<List<TransactionResponseDto>> getAllTransfersAsPayer(@RequestHeader(name="Authorization") @NotNull String token,
                                                                               @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
                                                                               @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        var email = tokenService.validateToken(token.replace("Bearer ", ""));
        var user = userRepository.findByEmail(email);
        var res = transactionService.getAllTransfersAsPayer(user, startDate, endDate);
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @GetMapping("/transfers/payee")
    public ResponseEntity<List<TransactionResponseDto>> getAllTransfersAsPayee(@RequestHeader(name="Authorization") @NotNull String token,
                                                                               @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
                                                                               @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        var email = tokenService.validateToken(token.replace("Bearer ", ""));
        var user = userRepository.findByEmail(email);
        var res = transactionService.getAllTransfersAsPayee(user, startDate, endDate);
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }
}
