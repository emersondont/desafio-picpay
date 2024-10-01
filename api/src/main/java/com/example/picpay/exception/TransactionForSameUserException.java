package com.example.picpay.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;

public class TransactionForSameUserException extends PicPayException{

    @Override
    public ProblemDetail toProblemDetail() {
        var pd = ProblemDetail.forStatus(HttpStatus.UNPROCESSABLE_ENTITY);

        pd.setTitle("Same User");
        pd.setDetail("You cannot transfer for the same user.");

        return pd;
    }
}
