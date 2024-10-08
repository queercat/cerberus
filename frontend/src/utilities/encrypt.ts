import CryptoJS from "crypto-js";

export const encrypt = (data: string, key: string) => {
  const iv = CryptoJS.lib.WordArray.random(16);
  const encrypted = CryptoJS.AES.encrypt(data, key, { iv });

  return encrypted.toString();
};
