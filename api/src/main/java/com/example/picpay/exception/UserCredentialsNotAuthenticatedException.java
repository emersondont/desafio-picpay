package com.example.picpay.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;

public class UserCredentialsNotAuthenticatedException extends PicPayException{
    @Override
    public ProblemDetail toProblemDetail() {
        var pd = ProblemDetail.forStatus(HttpStatus.UNAUTHORIZED);
        pd.setTitle("Incorrect Email or Password");
        pd.setDetail("Email ou Senha invalidos");

        return pd;
    }
}
