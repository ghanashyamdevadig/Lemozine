import apiClient from "./apiClient";
import endpoints from "./endpoints";

const apiService = {
  auth: {
    login: (data) => apiClient.post(endpoints.auth.login, data),
    signup: (data) => apiClient.post(endpoints.auth.signup, data),
  },
  users: {
    getAll: () => apiClient.get(endpoints.users.list),
    getById: (userId) => apiClient.get(endpoints.users.details(userId)),
    getCarDetails: (distance) =>
      apiClient.get(endpoints.users.calculateprice(distance)),
    giveFeedback: (data) => apiClient.post(endpoints.generic.feedback, data),
    getFeedback: () => apiClient.get(endpoints.generic.admin_feedback),
  },
  bookings: {
    booking: (data) => apiClient.post(endpoints.bookings.booking, data),
    adminbokings: () => apiClient.get(endpoints.bookings.admin_bookings),
    checkoutSession: (data) =>
      apiClient.post(endpoints.bookings.create_checkout_session, data),
  },
};

export default apiService;
