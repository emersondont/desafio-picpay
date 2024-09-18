interface UserDataResponseDto {
  fullName: string;
  email: string;
  balance: number;
  userType: 'COMMON' | 'MERCHANT';
}