package com.example.picpay.service;

import com.example.picpay.dto.TransactionDto;
import com.example.picpay.dto.TransactionResponseDto;
import com.example.picpay.dto.TransactionWithUpdatedBalanceResponseDto;
import com.example.picpay.dto.UserResponseDto;
import com.example.picpay.entity.Transaction;
import com.example.picpay.entity.User;
import com.example.picpay.exception.*;
import com.example.picpay.repository.TransactionRepository;
import com.example.picpay.repository.UserRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TransactionService {
    private final TransactionRepository transactionRepository;
//    private final AuthorizationClientService authorizationClientService;
//    private final NotificationService notificationService;
    private final UserRepository userRepository;

    public TransactionService(TransactionRepository transactionRepository, UserRepository userRepository) {
        this.transactionRepository = transactionRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public TransactionWithUpdatedBalanceResponseDto transfer(User payer, @Valid TransactionDto transactionDto) {
        var payee = userRepository.findByDocumentOrEmail(
                transactionDto.payeeDocumentOrEmail(),
                transactionDto.payeeDocumentOrEmail()
        );
        if(payee == null) {
            throw new UserNotFoundException(transactionDto.payeeDocumentOrEmail());
        }
        if(payee.getEmail().equals(payer.getEmail())) {
            throw new TransactionForSameUserException();
        }

        validateTransaction(transactionDto, payer);

        payer.debit(transactionDto.value());
        payee.credit(transactionDto.value());

        var transaction = new Transaction(payer, payee, transactionDto.value());

        userRepository.save(payer);
        userRepository.save(payee);
        var transactionResult = transactionRepository.save(transaction);

//        CompletableFuture.runAsync(() -> notificationService.sendNotification(transactionResult));

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

        var transactionResponse = new TransactionResponseDto(
                transactionResult.getId(),
                transactionResult.getValue(),
                payerDto,
                payeeDto,
                transactionResult.getTimestamp()
        );

        return new TransactionWithUpdatedBalanceResponseDto(transactionResponse, payer.getBalance());
   }

    public List<TransactionResponseDto> getAllTransfers(UserDetails user, LocalDate startDate, LocalDate endDate) {
       var listTransaction = transactionRepository.findByPayerOrPayeeAndTimestampBetween(
               user, user,getStartOfDay(startDate), getEndOfDay(endDate)
               );

       List<TransactionResponseDto> transactionsDto = listTransaction.stream().map(transaction -> {
           var payerDto = new UserResponseDto(
                   transaction.getPayer().getId(),
                   transaction.getPayer().getFullName(),
                   transaction.getPayer().getEmail()
           );

           var payeeDto = new UserResponseDto(
                   transaction.getPayee().getId(),
                   transaction.getPayee().getFullName(),
                   transaction.getPayee().getEmail()
           );

           return new TransactionResponseDto(
                   transaction.getId(),
                   transaction.getValue(),
                   payerDto,
                   payeeDto,
                   transaction.getTimestamp()
           );
       }).collect(Collectors.toList());

       return transactionsDto;
   }

    public List<TransactionResponseDto> getAllTransfersAsPayer(UserDetails user, LocalDate startDate, LocalDate endDate) {
        var listTransaction = transactionRepository.findByPayerAndTimestampBetween(
                user, getStartOfDay(startDate), getEndOfDay(endDate)
        );

        return listTransaction.stream().map(transaction -> {
            var payerDto = new UserResponseDto(
                    transaction.getPayer().getId(),
                    transaction.getPayer().getFullName(),
                    transaction.getPayer().getEmail()
            );

            var payeeDto = new UserResponseDto(
                    transaction.getPayee().getId(),
                    transaction.getPayee().getFullName(),
                    transaction.getPayee().getEmail()
            );

            return new TransactionResponseDto(
                    transaction.getId(),
                    transaction.getValue(),
                    payerDto,
                    payeeDto,
                    transaction.getTimestamp()
            );
        }).collect(Collectors.toList());
    }

    public List<TransactionResponseDto> getAllTransfersAsPayee(UserDetails user, LocalDate startDate, LocalDate endDate) {
        var listTransaction = transactionRepository.findByPayeeAndTimestampBetween(
                user, getStartOfDay(startDate), getEndOfDay(endDate)
        );

        return listTransaction.stream().map(transaction -> {
            var payerDto = new UserResponseDto(
                    transaction.getPayer().getId(),
                    transaction.getPayer().getFullName(),
                    transaction.getPayer().getEmail()
            );

            var payeeDto = new UserResponseDto(
                    transaction.getPayee().getId(),
                    transaction.getPayee().getFullName(),
                    transaction.getPayee().getEmail()
            );

            return new TransactionResponseDto(
                    transaction.getId(),
                    transaction.getValue(),
                    payerDto,
                    payeeDto,
                    transaction.getTimestamp()
            );
        }).collect(Collectors.toList());
    }

    private void validateTransaction(@Valid TransactionDto transactionDto, User payer) {
        if(!payer.isTransactionAllowedForUserType()) {
            throw new TransactionNotAllowedForUserTypeException();
        }
        if(!payer.isBalanceEqualOrGreaterThan(transactionDto.value())) {
            throw new InsufficientBalanceException();
        }

//        if(!authorizationClientService.isAuthorized(transactionDto)) {
//            throw new TransactionNotAuthorizedException();
//        }
    }

    private LocalDateTime getStartOfDay(LocalDate date) {
        return date != null ? date.atStartOfDay() : LocalDateTime.of(1970, 1, 1, 0, 0);
    }

    private LocalDateTime getEndOfDay(LocalDate date) {
        return date != null ? date.atTime(23, 59, 59) : LocalDateTime.now();
    }
}
