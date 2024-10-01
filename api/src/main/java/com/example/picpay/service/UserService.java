package com.example.picpay.service;

import com.example.picpay.dto.UserDataResponseDto;
import com.example.picpay.exception.UserNotFoundException;
import com.example.picpay.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public UserDataResponseDto getUserData(String email) {
        var user = userRepository.findByEmail(email);
        if(user == null) {
            throw new UserNotFoundException(email);
        }

        return new UserDataResponseDto(user.getFullName(), user.getEmail(), user.getBalance(), user.getUserType());
    }
}
