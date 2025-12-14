import AuthPage from "../page/AuthPage";
const routes = [
  { path: "/login", element: <AuthPage key="login" type="login" /> },
  { path: "/signup", element: <AuthPage key="sign up" type="sign up" /> },
];
export default routes;
