package com.example.picpay.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;

public class UserNotFoundException extends PicPayException{
    private String documentOrEmail;

    public UserNotFoundException(String documentOrEmail) {
        this.documentOrEmail = documentOrEmail;
    }

    @Override
    public ProblemDetail toProblemDetail() {
        var pd = ProblemDetail.forStatus(HttpStatus.UNPROCESSABLE_ENTITY);
        pd.setTitle("User not found");
        pd.setDetail("There is no user with CPF/CNPJ or Email: " + documentOrEmail);

        return pd;
    }
}
