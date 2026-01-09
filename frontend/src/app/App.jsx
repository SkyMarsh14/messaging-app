import UserContext from "../helper/UserContext.js";
import routes from "./routes.jsx";
import GlobalStyle from "./globalStyle.jsx";
import { ThemeProvider } from "styled-components";
import darkTheme from "../assets/darkTheme.js";
import lightTheme from "../assets/lightTheme.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState } from "react";

const router = createBrowserRouter(routes);
const App = () => {
  const prefersDarkTheme = () => {
    const savedThemePreference = localStorage.getItem("darkMode");
    if (savedThemePreference === null) {
      localStorage.setItem("darkMode", "true");
      return window.matchMedia("(prefers-color-scheme: dark)").matches; // Reads browser theme preferenece
    }
    return savedThemePreference == "true";
  };
  const [currentTheme, setCurrentTheme] = useState(
    prefersDarkTheme() ? darkTheme : lightTheme
  );
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
        setCurrentTheme,
      }}
    >
      <ThemeProvider theme={currentTheme}>
        <GlobalStyle
          bodyBgColor={currentTheme.primaryBgColor}
          textColor={currentTheme.primaryTextColor}
        />
        <RouterProvider router={router} />
      </ThemeProvider>
    </UserContext.Provider>
  );
};
export default App;
