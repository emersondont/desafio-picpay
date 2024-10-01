interface TransfersResponseDto extends Array<Transfer> {}

interface Transfer {
  id: number;
  value: number;
  payer: User;
  payee: User; 
  timestamp: string; // Usar string para representar a data no formato ISO
}