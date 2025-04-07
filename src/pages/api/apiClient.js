import axios from "axios";
import endpoints from "./endpoints";

const apiClient = axios.create({
  baseURL: "https://dev.api.masslivery.com", // Use environment variable for API base URL
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to refresh the token
const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken"); // Assuming refreshToken is stored
    if (!refreshToken) {
      throw new Error("No refresh token found");
    }

    const response = await axios.post(`${apiClient.defaults.baseURL}${endpoints.auth.regenerate}`, {
      refreshToken,
    });

    const newToken = response.data.token; // Adjust based on API response
    localStorage.setItem("authToken", newToken);
    return newToken;
  } catch (error) {
    console.error("Token refresh failed:", error);
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/"; // Redirect to login if refresh fails
    return null;
  }
};

// Request interceptor to add token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.token = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token expiration
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to an expired token and if it's not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const newToken = await refreshToken();
      if (newToken) {
        originalRequest.headers.token = newToken;
        return apiClient(originalRequest); // Retry the failed request
      }
    }

    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
