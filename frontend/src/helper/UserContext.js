import { createContext } from "react";

const UserContext = createContext({
  auth: false,
  setAuth: null,
  user: null,
  setUser: null,
  chatRoomId: null,
  setChatRoomId: null,
});
export default UserContext;
