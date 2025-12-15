const ENDPOINTS = {
  login: () => import.meta.env.VITE_BACKEND_URL + "auth/login",
  signup: () => import.meta.env.VITE_BACKEND_URL + "auth/create",
  users: () => import.meta.env.VITE_BACKEND_URL + "user/others",
};
export default ENDPOINTS;
