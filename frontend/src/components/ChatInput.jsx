import styled from "styled-components";
import { IoIosSend } from "react-icons/io";
import { useState } from "react";
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  border-radius: 8px;
  padding: 1em 1em;
  background-color: ${({ theme }) => theme.primaryBgColor};
  width: 80%;
  color: ${({ theme }) => theme.primaryTextColor};
  border: 0.5px solid ${({ theme }) => theme.lightTextColor};
`;
const StyledInput = styled.input`
  width: 100%;
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
const SendBtn = styled.div`
  display: flex;
  align-items: center;
  gap: 0.1em;
  color: ${({ theme }) => theme.linkBlueColor};
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
const Icon = styled(IoIosSend)`
  font-size: 1.2em;
  &:hover {
    text-decoration: underline;
  }
`;
const ChatInput = () => {
  const [message, setMessage] = useState(null);
  function handleChange(e) {
    setMessage(e.target.value);
  }
  return (
    <Wrapper>
      <StyledInput
        onChange={handleChange}
        placeholder="Type your message"
        name="message"
      />
      {message && (
        <SendBtn>
          <div>Send</div>
          <Icon />
        </SendBtn>
      )}
    </Wrapper>
  );
};

export default ChatInput;
