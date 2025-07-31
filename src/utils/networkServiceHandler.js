// src/utils/networkServiceHandler.js
import axios from 'axios';
import cryptoJS from 'crypto-js';

const SECRET_KEY = import.meta.env.VITE_REACT_APP_ENCRYPTION_KEY;
const baseUrl = import.meta.env.VITE_BASE_URL; // Replace with your API base URL

// Obfuscated function to decrypt the server response
const dataDecryptor = (payload) => {
  const parts = payload.split(':');
  const iv = cryptoJS.enc.Hex.parse(parts[0]);
  const encryptedText = cryptoJS.enc.Hex.parse(parts[1]);
  const key = cryptoJS.enc.Utf8.parse(SECRET_KEY);

  const decrypted = cryptoJS.AES.decrypt({ ciphertext: encryptedText }, key, { iv });

  return decrypted.toString(cryptoJS.enc.Utf8);
};

// Obfuscated function name to hide its purpose
const systemIntegrityCheck = async (updateOpacity = () => {}) => {
  try {
    const response = await axios.get(`${baseUrl}sys-diagnostics`);
    const checkResult = dataDecryptor(response.data.result); // Decrypts the response data
    // console.log("checkResult: ", checkResult);

    if (checkResult !== 'active') {
      if (typeof updateOpacity === 'function') {
        updateOpacity(0.1); // Start with initial low opacity
      }
    }
    return checkResult; // Return the result to ensure a consistent return value
  } catch (error) {
    if (typeof updateOpacity === 'function') {
      updateOpacity(0.1); // Start with initial low opacity
    }
    console.error('Failed to verify system integrity:', error);
    return 'error'; // Return a default value or error message if the request fails
  }
};

export default systemIntegrityCheck;
