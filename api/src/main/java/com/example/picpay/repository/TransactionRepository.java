package com.example.picpay.repository;

import com.example.picpay.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByPayerOrPayee(UserDetails payer, UserDetails payee);
    List<Transaction> findByPayer(UserDetails payer);
    List<Transaction> findByPayee(UserDetails payee);

    List<Transaction> findByPayerOrPayeeAndTimestampBetween(UserDetails payer, UserDetails payee, LocalDateTime startDate, LocalDateTime endDate);
    List<Transaction> findByPayerAndTimestampBetween(UserDetails payer, LocalDateTime startDate, LocalDateTime endDate);
    List<Transaction> findByPayeeAndTimestampBetween(UserDetails payee, LocalDateTime startDate, LocalDateTime endDate);
}
