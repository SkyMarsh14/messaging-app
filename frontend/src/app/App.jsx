import UserContext from "../helper/UserContext.js";
import routes from "./routes.jsx";
import GlobalStyle from "./globalStyle.jsx";
import { ThemeProvider } from "styled-components";
import theme from "../assets/darkTheme.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState } from "react";

const router = createBrowserRouter(routes);
const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [roomData, setRoomData] = useState(null);
  const [chatData, setChatData] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        roomData,
        setRoomData,
        chatData,
        setChatData,
        selectedRoom,
        setSelectedRoom,
      }}
    >
      <ThemeProvider theme={theme}>
        <GlobalStyle
          bodyBgColor={theme.primaryBgColor}
          textColor={theme.primaryTextColor}
        />
        <RouterProvider router={router} />
      </ThemeProvider>
    </UserContext.Provider>
  );
};
export default App;
