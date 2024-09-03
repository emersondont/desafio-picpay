package com.example.picpay.auth.service;

import com.example.picpay.dto.AuthetinticationDto;
import com.example.picpay.dto.LoginResponseDto;
import com.example.picpay.dto.RegisterDto;
import com.example.picpay.entity.User;
import com.example.picpay.exception.UserAlreadyExistsException;
import com.example.picpay.exception.UserCredentialsNotAuthenticatedException;
import com.example.picpay.exception.UserNotFoundException;
import com.example.picpay.repository.UserRepository;
import com.example.picpay.security.TokenService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.math.BigDecimal;

@Service
public class AuthorizationService implements UserDetailsService {
    @Autowired
    private ApplicationContext context;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public ResponseEntity<Object> login(@RequestBody @Valid AuthetinticationDto authetinticationDto) {
        var user = userRepository.findByEmail(authetinticationDto.email());
        if(user == null) {
            throw new UserNotFoundException(authetinticationDto.email());
        }
        // Verificar se a senha está correta
        if (!passwordEncoder.matches(authetinticationDto.password(), user.getPassword())) {
            throw new UserCredentialsNotAuthenticatedException();
        }
        AuthenticationManager authenticationManager = context.getBean(AuthenticationManager.class);
        var usernamePassword = new UsernamePasswordAuthenticationToken(authetinticationDto.email(), authetinticationDto.password());
        var auth = authenticationManager.authenticate(usernamePassword);
        var token = tokenService.generateToken((User) auth.getPrincipal());

        return ResponseEntity.ok(new LoginResponseDto(token));
    }

    public ResponseEntity<Object> register(@RequestBody RegisterDto registerDto) {
        if (this.userRepository.findByDocumentOrEmail(registerDto.document(),registerDto.email()) != null ) {
            throw new UserAlreadyExistsException();
        }
        String encryptedPassword = new BCryptPasswordEncoder().encode(registerDto.password());

        User newUser = registerDto.toUser(encryptedPassword);
        newUser.setBalance(BigDecimal.valueOf(1000));   //start balance with 1000

        this.userRepository.save(newUser);
        return ResponseEntity.ok().build();
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email);
    }
}
