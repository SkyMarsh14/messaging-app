const ENDPOINTS = {
  login: () => import.meta.env.VITE_BACKEND_URL + "auth/login",
  signup: () => import.meta.env.VITE_BACKEND_URL + "auth/create",
  users: () => import.meta.env.VITE_BACKEND_URL + "user/others",
  messages: (userId) =>
    import.meta.env.VITE_BACKEND_URL + `message/user/${userId}`,
  sendMessage: () => import.meta.env.VITE_BACKEND_URL + `message/send`,
};
export default ENDPOINTS;
