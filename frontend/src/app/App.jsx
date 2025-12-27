import UserContext from "../helper/UserContext.js";
import routes from "./routes.jsx";
import GlobalStyle from "./globalStyle.jsx";
import { ThemeProvider } from "styled-components";
import theme from "../assets/darkTheme.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState } from "react";

const router = createBrowserRouter(routes);
const App = () => {
  const [user, setUser] = useState(localStorage.getItem("user"));
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ThemeProvider theme={theme}>
        <GlobalStyle bodyBgColor={theme.bodyBgColor} />
        <RouterProvider router={router} />
      </ThemeProvider>
    </UserContext.Provider>
  );
};
export default App;
