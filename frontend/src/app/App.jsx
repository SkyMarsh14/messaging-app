import UserContext from "../helper/UserContext.js";
import routes from "./routes.jsx";
import GlobalStyle from "./globalStyle.jsx";
import { ThemeProvider } from "styled-components";
import darkTheme from "../assets/darkTheme.js";
import lightTheme from "../assets/lightTheme.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState } from "react";
import getPreferredTheme from "../helper/getPreferredTheme.js";

const router = createBrowserRouter(routes);
const App = () => {
  const [preferredTheme, setPreferredTheme] = useState(getPreferredTheme());
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
        preferredTheme,
        setPreferredTheme,
      }}
    >
      <ThemeProvider
        theme={preferredTheme === "light" ? lightTheme : darkTheme}
      >
        <GlobalStyle
          bodyBgColor={
            preferredTheme === "light"
              ? lightTheme.primaryBgColor
              : darkTheme.primaryBgColor
          }
          textColor={
            preferredTheme === "light"
              ? lightTheme.primaryTextColor
              : darkTheme.primaryTextColor
          }
        />
        <RouterProvider router={router} />
      </ThemeProvider>
    </UserContext.Provider>
  );
};
export default App;
