import styled from "styled-components";
import UserContext from "../helper/UserContext";
import { useContext } from "react";
import UserIcon from "./UserIcon";

const Wrapper = styled.div`
  display: flex;
  font-size: 2em;
  align-items: center;
  border-bottom: ${({ theme }) => theme.borderElementSeparator};
  padding: 0.3em 0.4em;
  gap: 10px;
`;
const Username = styled.div``;
const ChatNav = () => {
  const { selectedRoom } = useContext(UserContext);

  return (
    <Wrapper>
      <UserIcon url={selectedRoom.user?.url} />
      <Username>{selectedRoom.user.username}</Username>
    </Wrapper>
  );
};

export default ChatNav;
