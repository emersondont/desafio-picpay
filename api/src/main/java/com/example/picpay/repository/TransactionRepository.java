package com.example.picpay.repository;

import com.example.picpay.entity.Transaction;
import feign.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    @Query("SELECT t FROM transactions t WHERE (t.payer = :payer OR t.payee = :payee) AND (t.timestamp BETWEEN :startDate AND :endDate) ORDER BY t.timestamp DESC")
    List<Transaction> findTransactionsByPayerOrPayeeAndTimestampBetween(@Param("payer") UserDetails payer, @Param("payee") UserDetails payee, @Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);
//    List<Transaction> findByPayerOrPayeeAndTimestampBetweenOrderByTimestampDesc(UserDetails payer, UserDetails payee, LocalDateTime startDate, LocalDateTime endDate);

    @Query("SELECT t FROM transactions t WHERE t.payer = :payer AND t.timestamp BETWEEN :startDate AND :endDate ORDER BY t.timestamp DESC")
    List<Transaction> findTransactionsByPayerAndTimestampBetween(@Param("payer") UserDetails payer, @Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);
//    List<Transaction> findByPayerAndTimestampBetweenOrderByTimestampDesc(UserDetails payer, LocalDateTime startDate, LocalDateTime endDate);

    @Query("SELECT t FROM transactions t WHERE t.payee = :payee AND t.timestamp BETWEEN :startDate AND :endDate ORDER BY t.timestamp DESC")
    List<Transaction> findTransactionsByPayeeAndTimestampBetween(@Param("payee") UserDetails payee, @Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);
//    List<Transaction> findByPayeeAndTimestampBetweenOrderByTimestampDesc(UserDetails payee, LocalDateTime startDate, LocalDateTime endDate);
}
