import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 80000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.request.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      //Errorleri göster
      if (error.response.status === 401) {
        //Logine yönlendir sayfayı yenile
      } else if (error.response.status === 500) {
        console.error("Sunucuda bir sorun oluştu. Lütfen tekrar deneyin.");
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("İstek zaman aşımına uğradı. Lütfen tekrar deneyin.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
