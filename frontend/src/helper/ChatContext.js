import { createContext } from "react";

const ChatContext = createContext({
  message: null,
  setMessage: null,
});
export default ChatContext;
