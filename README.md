# Virtual Bank

Este repositório contém uma implementação aprimorada e com mais funcionalidades do desafio técnico para backend proposto pelo PicPay, disponível no seguinte link: [PicPay - Desafio Backend](https://github.com/PicPay/picpay-desafio-backend).

Você pode conferir minha implementação original para o desafio nessa branch: [desafio-picpay](https://github.com/emersondont/virtual-bank/tree/desafio-picpay)

# Backend

## Descrição do Projeto
Este projeto foi desenvolvido como uma solução para o desafio técnico proposto pela PicPay. O objetivo é criar uma aplicação backend que atenda aos requisitos especificados no desafio, utilizando tecnologias modernas e seguindo as melhores práticas de desenvolvimento. 
> [!NOTE]
> Além dos requisitos especificados no desafio, foram adicionadas funcionalidades como:
- Sistema de Login/Register
- Sistema de notificação utilizando WebSockets

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
- **Lombok**
- **WebSocket**

## Endpoints da API

### 1. Register
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
#### Retorno:
```http
{
  "token": ""
}
```

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
  "token": ""
}
```

### 3.Get User Data
#### Cabeçalho
```http
Authorization: Bearer <token>
```
#### Requisição
```http
GET /user
```
#### Retorno:
```http
{
  "fullName": "Nome completo",
  "email": "email@email.com",
  "balance": 1000
  "userType": "COMMON"
}
```

### 4.Transação
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
}
```

### 5.Transações
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
- /transfers : retorna todas as transações do usuário.
- /transfers/payer : retorna as transações que o usuário é o pagante.
- /transfers/payee : retorna as transações que o usuário é o recebedor.

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

