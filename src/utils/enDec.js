export function encrypt(text, shift) {
  let result = '';
  for (let i = 0; i < text.length; i += 1) {
    const charCode = text.charCodeAt(i);
    if (charCode >= 32 && charCode <= 126) {
      // Range of printable ASCII characters
      result += String.fromCharCode(((charCode - 32 + shift) % 95) + 32);
    } else {
      result += text.charAt(i); // Characters outside the range remain unchanged
    }
  }
  return result;
}

// Decryption function
export function decrypt(text, shift) {
  return encrypt(text, (95 - shift) % 95); // Decryption is just encryption with the inverse shift
}
