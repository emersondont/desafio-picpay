package com.example.picpay.controller;

import com.example.picpay.dto.CreateUserDto;
import com.example.picpay.entity.User;
import com.example.picpay.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<User> createUser(@RequestBody @Valid CreateUserDto createUserDto) {
        var user = userService.createUser(createUserDto);
        return ResponseEntity.ok(user);
    }
}
