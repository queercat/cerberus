import CryptoJS from 'crypto-js';

export const decrypt = (data: string, key: string): string => {
  return CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8);
};
