package com.example.picpay.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;

public class UserAlreadyExistsException extends PicPayException{
    @Override
    public ProblemDetail toProblemDetail() {
        var pd = ProblemDetail.forStatus(HttpStatus.CONFLICT);

        pd.setTitle("User already exists");
        pd.setDetail("User with this credentials already exists.");

        return pd;
    }
}
