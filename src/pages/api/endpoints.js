const endpoints = {
  auth: {
    login: "/users/login",
    signup: "/users/signup",
  },
  users: {
    list: "/users",
    details: (userId) => `/users/${userId}`,
    calculateprice:(distance)=> `/booking/calculatePrice?distance=${distance}`,
  },
  posts: {
    list: "/posts",
    details: (postId) => `/posts/${postId}`,
  },
};

export default endpoints;
