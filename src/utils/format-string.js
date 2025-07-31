export function capitalizeString(str) {
    if (!str) return ''; // Return empty string if input is null, undefined, or empty
    return str.charAt(0).toUpperCase() + str.slice(1);
  }