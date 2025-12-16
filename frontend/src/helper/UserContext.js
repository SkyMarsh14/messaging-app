import { createContext } from "react";

const UserContext = createContext({
  auth: false,
  setAuth: null,
  user: null,
  setUser: null,
});
export default UserContext;
