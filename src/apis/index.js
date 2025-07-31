import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_URL; // Replace with your API base URL

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json', // Only keep necessary headers
  },
});
// const api = axios.create({
//   baseURL: baseUrl,
//   headers: {
//     'Content-Type': 'application/json',
//     'Access-Control-Allow-Origin': import.meta.env.VITE_CURRENT_URL,
//     'Access-Control-Allow-Methods': 'OPTIONS, HEAD, GET, POST, PUT, DELETE',
//     'Access-Control-Allow-Headers':
//       'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
//     'X-Requested-With': '*',
//   },
// });
const getToken = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    // Handle missing token (e.g., redirect to login)
  }
  return token;
};

// Function to set up response interceptor with logout handling
export const setupInterceptors = (handelLogout) => {
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      // Handle 401 Unauthorized response
      if (
        (error.response && error.response.status === 401) ||
        (error.response && error.response.status === 403)
      ) {
        handelLogout(); // Call the logout action passed from component
      }
      return Promise.reject(error);
    }
  );
};

// Request interceptor to attach token dynamically
api.interceptors.request.use(
  async (config) => {
    const token = getToken(); // Replace with your token retrieval logic
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Exporting API methods individually
export const get = async (url, params = {}) => {
  const response = await api.get(url, { params });
  return response.data;
};

export const post = async (url, data) => {
  const response = await api.post(url, data);
  return response.data;
};

export const put = async (url, data) => {
  const response = await api.put(url, data);
  return response.data;
};

export const patch = async (url, data) => {
  const response = await api.patch(url, data);
  return response.data;
};

export const deleted = async (url, data) => {
  const response = await api.delete(url, { data });
  return response.data;
};

// Export the entire API object for custom configuration (optional)
export default api;
