import axios from 'axios';
import { API_ENDPOINT, DOMAIN } from './constants';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.headers['Content-Type'] = 'text/html; charset=UTF-8';
axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.headers.patch["Content-Type"] = "application/json";

export const HTTP = axios.create({
  baseURL: DOMAIN,
  timeout: 3000,
  withCredentials: true, // To enable cookies
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  onUploadProgress: (progressEvt) => {
    // console.log(Math.round(progressEvt.loaded / progressEvt.total * 100) + '%')
  },
});

export const API = axios.create({
  baseURL: API_ENDPOINT,
  timeout: 3000,
  withCredentials: true,
  // headers: { "X-Requested-With": "XMLHttpRequest" },
  headers: {
    'Content-type': 'application/json',
  },
  // onUploadProgress: (progressEvt) => {},
});
