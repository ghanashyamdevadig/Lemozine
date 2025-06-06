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
    admin_bookings:"/admin/bookings",
    create_checkout_session:'/create-checkout-session'
  },
  generic:{
    staticLoadData:'/staticLoadData'
  }
};

export default endpoints;
