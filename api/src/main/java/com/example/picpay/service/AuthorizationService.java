package com.example.picpay.service;

import com.example.picpay.client.AuthorizationClient;
import com.example.picpay.dto.TransactionDto;
import com.example.picpay.exception.PicPayException;
import org.springframework.stereotype.Service;

@Service
public class AuthorizationService {
    private final AuthorizationClient authorizationClient;

    public AuthorizationService(AuthorizationClient authorizationClient) {
        this.authorizationClient = authorizationClient;
    }

    public boolean isAuthorized(TransactionDto transactionDto) {
        var res= authorizationClient.isAuthorized();

        if(res.getStatusCode().isError()) {
            throw new PicPayException();
        }

        return res.getBody().authorized();
    }
}
