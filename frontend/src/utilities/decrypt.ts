export const decrypt = (data: string, key: string) => {
  const decrypted = CryptoJS.AES.decrypt(data, key);

  return decrypted.toString();
};
