package com.example.picpay.controller;

import com.example.picpay.dto.AuthetinticationDto;
import com.example.picpay.security.TokenService;
import com.example.picpay.service.TransactionService;
import com.example.picpay.service.UserService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class UserController {
    @Autowired
    TokenService tokenService;

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/user")
    public ResponseEntity<Object> getUserData(@RequestHeader(name="Authorization") @NotNull String token){
        var email = tokenService.validateToken(token.replace("Bearer ", ""));
        var res = userService.getUserData(email);

        return ResponseEntity.ok(res);
    }
}
