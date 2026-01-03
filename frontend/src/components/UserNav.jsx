import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import UserContext from "../helper/UserContext";
import UserIcon from "./UserIcon";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 2em;
  background-color: ${(props) => props.theme.primaryBgColor};
  overflow-y: auto;
  height: 100%;
  grid-column: 1/2;
`;
const Username = styled.div`
  font-size: 0.6em;
`;
const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;
  padding: 0.2em 0.3em;
  background-color: ${(props) =>
    props.$isSelected ? props.theme.selectedUserNavColor : "inherit"};
  &:hover {
    background-color: ${(props) => props.theme.userNavBgHover};
  }
`;
const UserNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { roomData, selectedRoom, setSelectedRoom } = useContext(UserContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  function handleClick(e, chatRoomId) {
    e.preventDefault();
    setSelectedRoom(roomData.find((room) => room.chatRoomId === chatRoomId));
    navigate(`/chat/${chatRoomId}`);
  }
  function togglePopup(e) {
    e.preventDefault();
    setIsOpen(!prev);
  }
  return (
    <Wrapper>
      <div>
        {roomData.map((roomUser) => (
          <UserContainer
            onClick={(e) => handleClick(e, roomUser.chatRoomId)}
            key={roomUser.id}
            $isSelected={selectedRoom?.chatRoomId === roomUser.chatRoomId}
          >
            <UserIcon url={roomUser.user?.url} />
            <Username>{roomUser.user.username}</Username>
          </UserContainer>
        ))}
      </div>
      <UserContainer onClick={togglePopup}>
        <UserIcon url={user?.url} />
        <Username>{user.username}</Username>
      </UserContainer>
    </Wrapper>
  );
};
export default UserNav;
