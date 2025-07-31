// api/index.js
import axios from 'axios';

import { getCredentials, saveAuthenticated, deleteAuthentication } from 'src/utils/auth';

import { signinApi } from 'src/apis/authApi'; // Import the API call for sign-in
import { useLoaderContext } from '../loader/contectLoader'; // Adjust path as needed

const baseUrl = import.meta.env.VITE_BASE_URL;
const api = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json', // Only keep necessary headers
  },
});

// const api = axios.create({
//   baseURL: baseUrl,
//   headers: {
//     'Access-Control-Allow-Origin': import.meta.env.VITE_CURRENT_URL,
//     'Access-Control-Allow-Methods': 'OPTIONS, HEAD, GET, POST, PUT, DELETE',
//     'Access-Control-Allow-Headers':
//       'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
//     'X-Requested-With': '*',
//   },
// });

const getToken = () => localStorage.getItem('token');

const interceptorsSetup = (showLoader, hideLoader) => {
  // Add request interceptor to dynamically attach token
  api.interceptors.request.use(
    async (config) => {
      showLoader();
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      // Remove content-type header for FormData
      if (config.data instanceof FormData) {
        delete config.headers['Content-Type'];
      }
      return config;
    },
    (error) => {
      hideLoader();
      return Promise.reject(error);
    }
  );

  // // Add response interceptor to hide the loader and handle 401 errors
  // api.interceptors.response.use(
  //   (response) => {
  //     hideLoader();
  //     return response;
  //   },
  //   async (error) => {
  //     hideLoader();

  //     // Handle 401 or 403 Unauthorized response
  //     if (
  //       (error.response && error.response.status === 401) ||
  //       (error.response && error.response.status === 403)
  //     ) {
  //       const credentials = getCredentials();
  //       if (credentials) {
  //         try {
  //           const response = await signinApi(credentials); // Re-login using saved credentials
  //           saveAuthenticated(response); // Save new token and user info
  //           error.config.headers.Authorization = `Bearer ${response.tokenData.token}`; // Update token in the failed request
  //           return api.request(error.config); // Retry the original request
  //         } catch (reloginError) {
  //           deleteAuthentication();
  //           window.location.replace('/'); // Redirect to login page if re-login fails
  //           return Promise.reject(reloginError);
  //         }
  //       } else {
  //         deleteAuthentication();
  //         window.location.replace('/'); // Redirect to login page if no credentials are saved
  //       }
  //     }

  //     return Promise.reject(error);
  //   }
  // );

  // Add response interceptor to hide the loader and handle 401 errors
  api.interceptors.response.use(
    (response) => {
      hideLoader();
      return response;
    },
    async (error) => {
      hideLoader();

      // Handle 401 Unauthorized response
      if (
        (error.response && error.response.status === 401) ||
        (error.response && error.response.status === 403)
      ) {
        if (error.response && error.response.status === 403) {
          const credentials = getCredentials();
          if (credentials) {
            try {
              const response = await signinApi(credentials); // Re-login using saved credentials
              saveAuthenticated(response); // Save new token and user info
              error.config.headers.Authorization = `Bearer ${response.tokenData.token}`; // Update token in the failed request
              return api.request(error.config); // Retry the original request
            } catch (reloginError) {
              deleteAuthentication();
              window.location.replace('/'); // Redirect to login page if re-login fails
              return Promise.reject(reloginError);
            }
          } else {
            deleteAuthentication();
            window.location.replace('/'); // Redirect to login page if no credentials are saved
          }
        }
        localStorage.removeItem('token'); // Clear any stored token
        localStorage.removeItem('role'); // Remove the role
        localStorage.removeItem('user'); // Remove the user
        window.location.replace = '/'; // Redirect to login page
      }

      return Promise.reject(error);
    }
  );
};

// Initialize interceptors outside the hooks to avoid multiple setups
let interceptorsInitialized = false;

export const useApi = () => {
  const { showLoader, hideLoader } = useLoaderContext();

  // Initialize interceptors only once
  if (!interceptorsInitialized) {
    interceptorsSetup(showLoader, hideLoader);
    interceptorsInitialized = true;
  }

  // Exporting API methods individually
  const get = async (url, params = {}) => {
    const response = await api.get(url, { params });
    return response.data;
  };

  const post = async (url, data) => {
    const response = await api.post(url, data);
    return response.data;
  };

  const put = async (url, data) => {
    const response = await api.put(url, data);
    return response.data;
  };

  const patch = async (url, data) => {
    const response = await api.patch(url, data);
    return response.data;
  };

  const deleted = async (url, data) => {
    const response = await api.delete(url, { data });
    return response.data;
  };

  return { get, post, put, patch, deleted };
};
