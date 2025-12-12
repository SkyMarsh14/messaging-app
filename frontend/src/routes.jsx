import AuthPage from "./page/AuthPage";
const routes = [
  { path: "/login", element: <AuthPage type="login" /> },
  { path: "/signup", element: <AuthPage type="sign up" /> },
];
export default routes;
