import { useApi } from './index'; // Adjust the path as needed

export const useApiAuthCalls = () => {
  const { post, patch } = useApi();

  const signupApi = (credentials) => post('/api/v1/auth/signup/mobile', { ...credentials });

  const signinApi = (credentials) => post('/api/v1/admin/login', { ...credentials });

  const sendOTP = () => post('/api/v1/admin/setting/send');

  const otpVerifyApi = (credentials) => patch('/api/v1/admin/setting/merchant', { ...credentials });

  const otpPasswordVerifyApi = (credentials) => patch('/api/v1/admin/change', { ...credentials });

  const otpResendApi = () =>  post('/api/v1/admin/setting/send');

  return {
    signupApi,
    signinApi,
    sendOTP,
    otpVerifyApi,
    otpResendApi,
    otpPasswordVerifyApi
  };
};
