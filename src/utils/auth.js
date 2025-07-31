// src/utils/auth.js

// Function to check if the user is authenticated
export const isAuthenticated = () => {
  // Retrieve the JWT token from local storage
  const token = localStorage.getItem('token');

  // Check if the token exists and is not expired
  if (token) {
    // Decode the token to get the expiration time
    const decodedToken = parseJwt(token);
    const currentTime = Date.now() / 1000; // Convert milliseconds to seconds

    // Check if the token is expired
    return decodedToken.exp > currentTime;
  }

  return false; // Return false if token does not exist or is expired
};

// Function to get user data
export const getUserData = () => {
  const user = localStorage.getItem('user');
  const role = localStorage.getItem('role'); // Retrieve the role
  if (user && role) {
    return { user: JSON.parse(user), role }; // Return both mobile and role
  }
  return null;
};

// Function to save token data into local storage
export const deleteAuthentication = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role'); // Remove the role
  localStorage.removeItem('user'); // Remove the user
  localStorage.removeItem('credentials'); // Remove the credentials
};

// Function to save login credentials (use encryption in production)
export const saveCredentials = (mobile, password) => {
  localStorage.setItem('credentials', JSON.stringify({ mobile, password }));
};

// Function to get saved login credentials
export const getCredentials = () => {
  const credentials = localStorage.getItem('credentials');
  return credentials ? JSON.parse(credentials) : null;
};

// Update `saveAuthenticated` to also save credentials
export const saveAuthenticated = (data) => {
  const token = data?.tokenData.token;
  const role = data?.data.type;
  const user = JSON.stringify(data?.data);
  localStorage.setItem('token', token);
  localStorage.setItem('role', role); // Save role to localStorage
  localStorage.setItem('user', user); // Save user to localStorage
};

// Helper function to parse JWT token
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (error) {
    return {};
  }
};
