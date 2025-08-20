


import axios from "axios";

// Authenticated instance
export const axiosInstance = axios.create({
  baseURL: "http://51.21.215.128:8080",
    // baseURL: "https://api.jobjourney.com",

});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Public instance (no auth)
export const publicAxios  = axios.create({
  baseURL: "http://51.21.215.128:8080",
    // baseURL: "https://api.jobjourney.com",

});
