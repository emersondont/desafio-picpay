# Desafio PicPay - Backend

Este repositório contém a implementação do desafio técnico para backend proposto pelo PicPay, disponível no seguinte link: [PicPay - Desafio Backend](https://github.com/PicPay/picpay-desafio-backend).

## Descrição do Projeto
Este projeto foi desenvolvido como uma solução para o desafio técnico proposto pela PicPay. O objetivo é criar uma aplicação backend que atenda aos requisitos especificados no desafio, utilizando tecnologias modernas e seguindo as melhores práticas de desenvolvimento.

## Tecnologias Utilizadas

O backend desta aplicação foi desenvolvido utilizando as seguintes tecnologias:

- **Java 21**
- **Spring Boot**
- **Spring Data JPA**
- **PostgreSQL**
- **Docker**
- **Spring Cloud OpenFeign**
- **ControllerAdvice & Problem Details**
- **Hibernate Validator**
- **Spring Security**

## Endpoints da API

### 1. Resgister
#### Requisição
```http
POST /register
{
  "fullName": "Nome completo",
  "document": "123.456.789-01",
  "email": "email@email.com",
  "password": "123",
  "userType": "COMMON"
}
```
- "document" : CPF ou CNPJ
- "userType" : "COMMON" ou "MERCHANT"
### 2. Login
#### Requisição
```http
POST /login
{
  "email": "email@email.com",
  "password": "123",
}
```
#### Retorno:
```http
{
  "token": "",
  "fullName": "Nome completo",
  "email": "email@email.com",
  "balance": 1000.00
}
```

### 3.Transação
#### Cabeçalho
```http
Authorization: Bearer <token>
```
#### Requisição
```http
POST /transfer
{
  "payeeDocumentOrEmail": "email@email.com",
  "value": 100
}
```
#### Retorno:
```http
{
  "id": 1,
  "value": 100,
  "payer": {
    "fullName": "Nome completo",
    "email": "email@email.com"
  },
  "payee": {
    "fullName": "Nome completo",
    "email": "email@email.com"
  },
  "timestamp": "2024-08-26T16:39:25.250033382"
  "updatedBalance": 900.00
}
```

### 4.Transações
#### Cabeçalho
```http
Authorization: Bearer <token>
```

#### Requisição
```http
GET /transfers
GET /transfers/payer
GET /transfers/payee
```
ou (startDate e endDate são opcionais)
```http
GET /transfers?startDate=2024-08-01&endDate=2024-08-25
GET /transfers/payer?startDate=2024-08-01&endDate=2024-08-25
GET /transfers/payee?startDate=2024-08-01&endDate=2024-08-25
```
#### Retorno:
```http
[
  {
    "id": 1,
    "value": 100.00,
    "payer": {
      "fullName": "Nome completo",
      "email": "email@email.com"
    },
    "payee": {
      "fullName": "Nome completo",
      "email": "email@email.com"
    },
    "timestamp": "2024-08-26T02:15:43.9992"
  },
  {
    "id": 2,
    "value": 100.00,
    "payer": {
      "fullName": "Nome completo",
      "email": "email@email.com"
    },
    "payee": {
      "fullName": "Nome completo",
      "email": "email@email.com"
    },
    "timestamp": "2024-08-26T02:16:01.656336"
  }
]
```

