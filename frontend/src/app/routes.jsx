import AuthPage from "../page/AuthPage";
import Dashboard from "../page/Dashboard";
const routes = [
  { path: "/", element: <Dashboard /> },
  { path: "/login", element: <AuthPage key="login" type="login" /> },
  { path: "/signup", element: <AuthPage key="sign up" type="sign up" /> },
];
export default routes;
