import axiosInstance from "./axiosInstance";

const apiService = async (method, url, body = null, headers = {}) => {
  try {
    const upperMethod = method.toUpperCase();
    const response = await axiosInstance({
      method: upperMethod,
      url,
      data: (upperMethod === "GET" || upperMethod === "DELETE") ? undefined : body,
      headers,
    });

    return response;
  }
   catch (error) {
    console.error(`API Error [${upperMethod} ${url}]:`, error.response?.data || error.message);
    throw error;
  }
};

export default apiService;