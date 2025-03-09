import apiClient from './apiClient';
import endpoints from './endpoints';

const apiService = {
  auth: {
    login: (data) => apiClient.post(endpoints.auth.login, data),
    signup: (data) => apiClient.post(endpoints.auth.signup, data),
  },
  users: {
    getAll: () => apiClient.get(endpoints.users.list),
    getById: (userId) => apiClient.get(endpoints.users.details(userId)),
    getCarDetails: (distance) => apiClient.get(endpoints.users.calculateprice(distance)),
  },
  posts: {
    getAll: () => apiClient.get(endpoints.posts.list),
    getById: (postId) => apiClient.get(endpoints.posts.details(postId)),
  },
};

export default apiService;
