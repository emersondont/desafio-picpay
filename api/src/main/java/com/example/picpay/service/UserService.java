package com.example.picpay.service;

import com.example.picpay.dto.CreateUserDto;
import com.example.picpay.entity.User;
import com.example.picpay.exception.UserDataAlreadyExistsException;
import com.example.picpay.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User createUser(CreateUserDto createUserDto) {
        var userDb = userRepository.findByDocumentOrEmail(createUserDto.document(), createUserDto.email());
        if(userDb.isPresent()) {
            throw new UserDataAlreadyExistsException("Document or Email already exists");
        }

        return userRepository.save(createUserDto.toUser());
    }
}
