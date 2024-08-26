package com.example.picpay.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.math.BigDecimal;
import java.util.Collection;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "users")
@Table(name = "tb_users")
public class User  implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "full_name")
    private String fullName;
    @Column(unique = true)
    private String document;
    @Column(unique = true)
    private String email;
    private String password;
    private BigDecimal balance = BigDecimal.ZERO;
    @Enumerated(EnumType.STRING)
    private UserType userType;


    public User(String fullName, String document, String email, String password, UserType userType) {
        this.fullName = fullName;
        this.document = document;
        this.email = email;
        this.password = password;
        this.userType = userType;
    }

    //
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public String getFullName() {
//        return fullName;
//    }
//
//    public void setFullName(String fullName) {
//        this.fullName = fullName;
//    }
//
//    public String getDocument() {
//        return document;
//    }
//
//    public void setDocument(String document) {
//        this.document = document;
//    }
//
//    public String getEmail() {
//        return email;
//    }
//
//    public void setEmail(String email) {
//        this.email = email;
//    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if(this.userType == UserType.COMMON)
            return List.of(new SimpleGrantedAuthority("ROLE_COMMON"), new SimpleGrantedAuthority("ROLE_MERCHANT"));

        return List.of(new SimpleGrantedAuthority("ROLE_MERCHANT"));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

//    public void setPassword(String password) {
//        this.password = password;
//    }
//
    public BigDecimal getBalance() {
        return balance;
    }
//
//    public void setBalance(BigDecimal balance) {
//        this.balance = balance;
//    }

//    public UserType getUserType() {
//        return userType;
//    }
//
//    public void setUserType(UserType userType) {
//        this.userType = userType;
//    }

    public boolean isTransactionAllowedForUserType() {
        return this.userType == UserType.COMMON;
    }

    public boolean isBalanceEqualOrGreaterThan(BigDecimal value) {
        return this.balance.doubleValue() >= value.doubleValue();
    }

    public void debit(BigDecimal value) {
        this.balance = this.balance.subtract(value);
    }

    public void credit(BigDecimal value) {
        this.balance = this.balance.add(value);
    }
}
