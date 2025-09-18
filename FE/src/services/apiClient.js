import axios from "axios";
import url from "../config/url";
import { getAccessToken } from "./tokenService";

const apiClient = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {

    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//Interceptor de respuesta para manejar errores globales
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Token inválido o expirado");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
