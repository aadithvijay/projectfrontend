import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://projectbackend-wupg.onrender.com",
  timeout: 10000,
});

// Attach token automatically
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle responses globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;

      if (status === 404) {
        console.log("API Not Found");
      }

      if (status === 500) {
        console.log("Server Error");
      }

      if (status === 401) {
        console.log("Unauthorized (NOT logging out user automatically)");
       
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;