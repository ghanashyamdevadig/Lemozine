const endpoints = {
  auth: {
    login: "/users/login",
    signup: "/users/signup",
    regenerate:'user/auth/refresh'
  },
  users: {
    list: "/users",
    details: (userId) => `/users/${userId}`,
    calculateprice:(distance)=> `/booking/calculatePrice?distance=${distance}`,
  },
  bookings: {
    booking: "/booking",
  },
};

export default endpoints;
