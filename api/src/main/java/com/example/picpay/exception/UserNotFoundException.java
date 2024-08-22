package com.example.picpay.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;

public class UserNotFoundException extends PicPayException{
    private Long userId;

    public UserNotFoundException(Long userId) {
        this.userId = userId;
    }

    @Override
    public ProblemDetail toProblemDetail() {
        var pd = ProblemDetail.forStatus(HttpStatus.UNPROCESSABLE_ENTITY);
        pd.setTitle("User not found");
        pd.setDetail("There is no user with id: " + userId);

        return pd;
    }
}
