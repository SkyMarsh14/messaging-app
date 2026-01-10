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
const Bio = styled.div`
  font-size: 0.5em;
  margin-left: auto;
  margin-right: 6em;
`;
const ChatNav = () => {
  const { selectedRoom } = useContext(UserContext);
  return (
    <Wrapper>
      <UserIcon url={selectedRoom.user?.url} />
      <Username>{selectedRoom.user.username}</Username>
      <Bio>
        {selectedRoom.user?.bio || "The user has not filled out the bio yet."}
      </Bio>
    </Wrapper>
  );
};

export default ChatNav;
