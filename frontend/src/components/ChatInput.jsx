import styled from "styled-components";
import { IoIosSend } from "react-icons/io";
import { useState, useContext } from "react";
import ENDPOINTS from "../api/EndPoints";
import { useParams, useNavigate } from "react-router-dom";
import UserContext from "../helper/UserContext";

const Wrapper = styled.div`
  margin: 1em;
  display: flex;
  align-items: center;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.primaryBgColor};
  color: ${({ theme }) => theme.primaryTextColor};
  border: ${({ theme }) => theme.borderElementSeparator};
`;
const StyledInput = styled.input`
  width: 100%;
  padding: 1em 1em;
  border-radius: 8px;
  background-color: inherit;
  color: inherit;
  border: none;
  &::placeholder {
    color: ${({ theme }) => theme.lightTextColor};
  }
  &:focus-visible {
    outline: none;
  }
`;
const SendBtn = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.1em;
  color: ${({ theme }) => theme.linkBlueColor};
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;
const Icon = styled(IoIosSend)`
  font-size: 1.2em;
  &:hover {
    text-decoration: underline;
  }
`;
const ChatInput = () => {
  const { setChatData } = useContext(UserContext);
  const navigate = useNavigate();
  const url = ENDPOINTS.sendMessage();
  const { chatRoomId } = useParams();
  const [message, setMessage] = useState(null);
  const [composing, setComposition] = useState(false);
  const startComposition = () => setComposition(true);
  const endComposition = () => setComposition(false);
  const user = JSON.parse(localStorage.getItem("user"));
  function handleChange(e) {
    setMessage(e.target.value);
  }
  function handleEnter(e) {
    if (e.key === "Enter") {
      if (composing) return; // Prevent sending a message while on IME in some languages.
      handleSubmit(e);
    }
    return;
  }
  async function handleSubmit(e) {
    if (message.trim().length === 0) {
      return;
    }
    e.target.value = "";
    setMessage("");
    const body = JSON.stringify({
      content: message,
      chatRoomId,
    });

    const response = await fetch(url, {
      body,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      mode: "cors",
    });
    if (response.status === 401) {
      navigate("/login");
    }
    const json = await response.json();
    //Avoid requerying the whole chat and add message at the end instead.
    setChatData((prev) => {
      return {
        ...prev,
        messages: [...prev.messages, json.createdMessage],
      };
    });
  }
  return (
    <Wrapper>
      <StyledInput
        onCompositionStart={startComposition}
        onCompositionEnd={endComposition}
        onKeyDown={handleEnter}
        onChange={handleChange}
        placeholder="Type your message"
        name="message"
      />
      {message && (
        <SendBtn onClick={handleSubmit}>
          <div>Send</div>
          <Icon />
        </SendBtn>
      )}
    </Wrapper>
  );
};

export default ChatInput;
