import { createContext } from "react";

const UserContext = createContext({
  auth: false,
  setAuth: null,
  user: null,
  setUser: null,
  chatRoomId: null,
  setChatRoomId: null,
  selectedRoom: null,
  setSelectedRoom: null,
  preferredTheme: "light",
  setPreferredTheme: null,
});
export default UserContext;
