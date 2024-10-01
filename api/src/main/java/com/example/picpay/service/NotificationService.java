package com.example.picpay.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class NotificationService {
    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public NotificationService(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    public void sendTransactionNotification(String payeeEmail, String payerName, BigDecimal value) {
        messagingTemplate.convertAndSendToUser(
                payeeEmail,
                "/topic/notifications",
                "Você recebeu uma transferência de R$ " + value + " de " + payerName
                );
    }
}
