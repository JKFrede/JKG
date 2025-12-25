
export enum CryptoAlgorithm {
  AES = 'AES',
  DES = 'DES',
  TRIPLE_DES = 'TripleDES'
}

export enum AuthMode {
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER'
}

export interface User {
  username: string;
  email: string;
}

export interface CryptoResult {
  output: string;
  algorithm: CryptoAlgorithm;
  timestamp: string;
  operation: 'Encrypt' | 'Decrypt';
}
