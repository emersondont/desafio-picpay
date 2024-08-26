package com.example.picpay.service;

import com.example.picpay.dto.TransactionDto;
import com.example.picpay.dto.TransactionResponseDto;
import com.example.picpay.dto.UserResponseDto;
import com.example.picpay.entity.Transaction;
import com.example.picpay.entity.User;
import com.example.picpay.exception.InsufficientBalanceException;
import com.example.picpay.exception.TransactionNotAllowedForUserTypeException;
import com.example.picpay.exception.TransactionNotAuthorizedException;
import com.example.picpay.exception.UserNotFoundException;
import com.example.picpay.repository.TransactionRepository;
import com.example.picpay.repository.UserRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;

@Service
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final AuthorizationClientService authorizationClientService;
    private final NotificationService notificationService;
    private final UserRepository userRepository;

    public TransactionService(TransactionRepository transactionRepository, AuthorizationClientService authorizationClientService, NotificationService notificationService, UserRepository userRepository) {
        this.transactionRepository = transactionRepository;
        this.authorizationClientService = authorizationClientService;
        this.notificationService = notificationService;
        this.userRepository = userRepository;
    }

    @Transactional
    public TransactionResponseDto transfer(@Valid TransactionDto transactionDto) {
        var payer = userRepository.findById(transactionDto.payer())
                .orElseThrow(() -> new UserNotFoundException(transactionDto.payer()));

        var payee = userRepository.findById(transactionDto.payee())
                .orElseThrow(() -> new UserNotFoundException(transactionDto.payee()));

        validateTransaction(transactionDto, payer);

        payer.debit(transactionDto.value());
        payee.credit(transactionDto.value());

        var transaction = new Transaction(payer, payee, transactionDto.value());

        userRepository.save(payer);
        userRepository.save(payee);
        var transactionResult = transactionRepository.save(transaction);

        CompletableFuture.runAsync(() -> notificationService.sendNotification(transactionResult));

        var payerDto = new UserResponseDto(
                payer.getId(),
                payer.getFullName(),
                payer.getEmail()
        );

        var payeeDto = new UserResponseDto(
                payee.getId(),
                payee.getFullName(),
                payee.getEmail()
        );

        // Retorne o TransactionResponseDto
        return new TransactionResponseDto(
                transactionResult.getId(),
                transactionResult.getValue(),
                payerDto,
                payeeDto,
                transactionResult.getTimestamp()
        );
   }

    private void validateTransaction(@Valid TransactionDto transactionDto, User payer) {
        if(!payer.isTransactionAllowedForUserType()) {
            throw new TransactionNotAllowedForUserTypeException();
        }
        if(!payer.isBalanceEqualOrGreaterThan(transactionDto.value())) {
            throw new InsufficientBalanceException();
        }

        if(!authorizationClientService.isAuthorized(transactionDto)) {
            throw new TransactionNotAuthorizedException();
        }
    }
}
