import { createContext } from "react";

const UserContext = createContext({
  auth: false,
});
export default UserContext;
