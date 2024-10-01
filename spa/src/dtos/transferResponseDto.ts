interface User {
  fullName: string;
  email: string;
}

interface TransferResponseDto {
  id: number;
  value: number;
  payer: User;
  payee: User;
  timestamp: string;
  updatedBalance: number;
}