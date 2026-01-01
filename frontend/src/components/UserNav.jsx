import styled from "styled-components";
import { HiUser } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import UserContext from "../helper/UserContext";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 2em;
  background-color: ${(props) => props.theme.primaryBgColor};
  overflow-y: auto;
  height: 100%;
  grid-column: 1/2;
`;
const Username = styled.div`
  font-size: 0.6em;
`;
const ProfileIcon = styled.div`
  border: 0.2px groove ${({ theme }) => theme.lightTextColor};
  border-radius: 50%;
  padding: 0.15em;
`;
const IconContainer = styled(ProfileIcon)`
  background-color: ${({ theme }) => theme.userNavBgColor};
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
const DefaultIcon = styled(HiUser)`
  color: ${(props) => props.theme.iconColor};
`;
const CustomIcon = styled.div`
  width: 1em;
  height: 1em;
  background-image: url(${(props) => props.$url});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;
const UserNav = () => {
  const { roomData, selectedRoom, setSelectedRoom } = useContext(UserContext);
  const navigate = useNavigate();
  function handleClick(e, chatRoomId) {
    e.preventDefault();
    setSelectedRoom(roomData.find((room) => room.chatRoomId === chatRoomId));
    navigate(`/chat/${chatRoomId}`);
  }
  return (
    <Wrapper>
      {roomData.map((roomUser) => (
        <UserContainer
          onClick={(e) => handleClick(e, roomUser.chatRoomId)}
          key={roomUser.id}
          $isSelected={selectedRoom?.chatRoomId === roomUser.chatRoomId}
        >
          <IconContainer>
            {roomUser.user?.url ? (
              <CustomIcon $url={roomUser.user.url} />
            ) : (
              <DefaultIcon />
            )}
          </IconContainer>
          <Username>{roomUser.user.username}</Username>
        </UserContainer>
      ))}
    </Wrapper>
  );
};
export default UserNav;
