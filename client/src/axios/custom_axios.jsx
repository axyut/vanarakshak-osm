import axios from "axios";

const axiosInstance = axios.create({
  // with vite import env vars with import.meta.env
  baseURL: import.meta.env.VITE_BACKEND,
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
  },
  //timeout: 5000, // 5 seconds
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    config.headers.Authorization = localStorage.token
      ? `Bearer ${localStorage?.token}`
      : null;
    return config;
  },
  // Do something with request error
  (error) => Promise.reject(error)
);

export default axiosInstance;
