import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from "axios";
import * as API from "@/constants/api";
import useStore from "@/context/store";
interface ErrorResponse {
    message: string;
  }
const request = axios.create({
  baseURL: API.DOMAIN,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("access_token");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response Interceptor
request.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const errorMessage = (error.response?.data as ErrorResponse)?.message;

    if (errorMessage === "Token not verified!") {
      const { logOut } = useStore.getState();
      logOut();
      window.location.href = "/signin";
    }

    return Promise.reject(error);
  }
);

export default request;
