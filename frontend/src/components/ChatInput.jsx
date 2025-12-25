import styled from "styled-components";
import { IoIosSend } from "react-icons/io";
import { useState } from "react";
import ENDPOINTS from "../api/EndPoints";
import { useParams, useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.primaryBgColor};
  color: ${({ theme }) => theme.primaryTextColor};
  border: 0.5px solid ${({ theme }) => theme.lightTextColor};
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
const ChatInput = ({ setChatData }) => {
  const navigate = useNavigate();
  const url = ENDPOINTS.sendMessage();
  const { userId } = useParams();
  const [message, setMessage] = useState(null);
  function handleChange(e) {
    setMessage(e.target.value);
  }
  function handleEnter(e) {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
    return;
  }
  async function handleSubmit(e) {
    e.target.value = "";
    setMessage("");
    const body = JSON.stringify({
      content: message,
      receiverId: userId,
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
  }
  return (
    <Wrapper>
      <StyledInput
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
