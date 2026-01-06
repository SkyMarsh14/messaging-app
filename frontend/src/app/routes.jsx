import AuthPage from "../page/AuthPage";
import Dashboard from "../page/Dashboard";
import ChatPane from "../components/ChatPane";
import ChatPlaceHolder from "../components/ChatPlaceHolder";
import EditProfile from "../page/EditProfile";
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
        path: "/chat/:chatRoomId",
        element: <ChatPane />,
      },
    ],
    errorElement: <Error />,
  },
  { path: "/login", element: <AuthPage key="login" type="login" /> },
  { path: "/signup", element: <AuthPage key="sign up" type="sign up" /> },
  { path: "/edit-profile", element: <EditProfile /> },
];
export default routes;
