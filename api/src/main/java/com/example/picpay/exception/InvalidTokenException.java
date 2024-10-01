package com.example.picpay.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;

public class InvalidTokenException extends PicPayException{
    @Override
    public ProblemDetail toProblemDetail() {
        var pd = ProblemDetail.forStatus(HttpStatus.FORBIDDEN);

        pd.setTitle("Invalid token");
        pd.setDetail("Error verifying token.");

        return pd;
    }
}
