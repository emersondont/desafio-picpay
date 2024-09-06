interface TransfersResponseDto extends Array<Transfer> {}

interface Transfer {
  id: number;
  value: number;
  payer: {
    fullName: string;
    email: string;
  };
  payee: {
    fullName: string;
    email: string;
  };
  timestamp: string; // Usar string para representar a data no formato ISO
}