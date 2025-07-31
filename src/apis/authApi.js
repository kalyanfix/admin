import { post } from "./index";

export const signupApi = (credentials) =>  post('/api/v1/auth/signup/mobile',{...credentials})


export const signinApi = (credentials) =>  post('/api/v1/admin/login',{...credentials})


export const otpVerifyApi = (credentials) =>  post('/api/v1/auth/mobile/verify',{...credentials})


export const otpResendApi = (credentials) =>  post('/api/v1/auth/otp/resend',{...credentials})
