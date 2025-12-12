const ENDPOINTS = {
  login: () => import.meta.env.VITE_BACKEND_URL + "auth/login",
  signup: () => import.meta.env.VITE_BACKEND_URL + "auth/create",
};
export default ENDPOINTS;
