import CryptoJS from "crypto-js";

/**
 * Hashes the given data using Sha512.
 * @param data - The text to hash
 */
export const hash = (data: string): string => CryptoJS.SHA512(data).toString();
