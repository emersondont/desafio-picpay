package com.example.picpay.service;

import com.example.picpay.client.NotificationClient;
import com.example.picpay.entity.Transaction;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {
    private static final Logger logger = LoggerFactory.getLogger(NotificationService.class);
    private final NotificationClient notificationClient;

    public NotificationService(NotificationClient notificationClient) {
        this.notificationClient = notificationClient;
    }

    public void sendNotification(Transaction transaction) {
        try {
            logger.info("Sending notification...");
            var res = notificationClient.sendNotification(transaction);

            if(res.getStatusCode().isError()) {
                logger.error("Error while sending notification, status code is not OK");
            }
        } catch (Exception e) {
            logger.error("Error while sending notification", e);
        }
    }
}
