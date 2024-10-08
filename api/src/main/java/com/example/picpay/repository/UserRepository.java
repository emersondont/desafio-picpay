package com.example.picpay.repository;

import com.example.picpay.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByDocumentOrEmail(String document, String email);
    User findByEmail(String email);
}
