import axios from 'axios';
import { BASE_URL } from '../../../../application-configuration/app.config';

export const LOGIN_URL = `${BASE_URL}/employee/login`;
export const REGISTER_URL = 'api/auth/register';
export const REQUEST_PASSWORD_URL = `${BASE_URL}/employee/send-reset-password-link`;
export const RESSET_PASSWORD_URL  = `${BASE_URL}/employee/reset-password`;
export const RESSET_PASSWORD_SMS  = `${BASE_URL}/employee/send-reset-password-sms`;
export const VERIFY_CODE  = `${BASE_URL}/employee/verify-code`;


export const ME_URL = `${BASE_URL}/employee/login`;

export function login(email, password) {
  return axios.post(LOGIN_URL, { email, password });
}

export function register(email, fullname, username, password) {
  return axios.post(REGISTER_URL, { email, fullname, username, password });
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function requestPhoneNumberValidationPin(phoneNumber,countryCode) {
  return axios.post(RESSET_PASSWORD_SMS, { phoneNumber,countryCode });
}


export function verifyCode(pin,token) {
  return axios.post(VERIFY_CODE, { pin,token });
}



export function ressetPassword(password,token) {
  return axios.post(RESSET_PASSWORD_URL, { password },{
    headers:{
      authorization: `Bearer ${token}`
    }
  });
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return axios.get(ME_URL);
}
