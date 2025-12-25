
import CryptoJS from 'https://esm.sh/crypto-js@4.2.0';
import { CryptoAlgorithm } from '../types';

export const encrypt = (text: string, key: string, algorithm: CryptoAlgorithm): string => {
  if (!text || !key) return '';
  
  switch (algorithm) {
    case CryptoAlgorithm.AES:
      return CryptoJS.AES.encrypt(text, key).toString();
    case CryptoAlgorithm.DES:
      return CryptoJS.DES.encrypt(text, key).toString();
    case CryptoAlgorithm.TRIPLE_DES:
      return CryptoJS.TripleDES.encrypt(text, key).toString();
    default:
      return '';
  }
};

export const decrypt = (ciphertext: string, key: string, algorithm: CryptoAlgorithm): string => {
  if (!ciphertext || !key) return '';
  
  try {
    let bytes;
    switch (algorithm) {
      case CryptoAlgorithm.AES:
        bytes = CryptoJS.AES.decrypt(ciphertext, key);
        break;
      case CryptoAlgorithm.DES:
        bytes = CryptoJS.DES.decrypt(ciphertext, key);
        break;
      case CryptoAlgorithm.TRIPLE_DES:
        bytes = CryptoJS.TripleDES.decrypt(ciphertext, key);
        break;
      default:
        return 'Unsupported algorithm';
    }
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText || 'Invalid key or corrupted data';
  } catch (error) {
    return 'Decryption failed: ' + (error as Error).message;
  }
};
