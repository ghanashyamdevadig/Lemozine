import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://dev.api.masslivery.com", // Use environment variable for API base URL
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptors (e.g., auth token)
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // Example: get token from storage
    console.log(token, "tokeeen");
    if (token) {
      config.headers.token = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptors (handle errors globally)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
