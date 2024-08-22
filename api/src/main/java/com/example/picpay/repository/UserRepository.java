package com.example.picpay.repository;

import com.example.picpay.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByDocumentOrEmail(String document, String email);
}
