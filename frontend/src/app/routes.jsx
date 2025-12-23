import AuthPage from "../page/AuthPage";
import Dashboard from "../page/Dashboard";
import ChatPane from "../components/ChatPane";
import ChatPlaceHolder from "../components/ChatPlaceHolder";
import Error from "../page/Error";
const routes = [
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <ChatPlaceHolder />,
      },
      {
        path: "/chat/:userId",
        element: <ChatPane />,
      },
    ],
    errorElement: <Error />,
  },
  { path: "/login", element: <AuthPage key="login" type="login" /> },
  { path: "/signup", element: <AuthPage key="sign up" type="sign up" /> },
];
export default routes;
