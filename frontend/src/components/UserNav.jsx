import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import UserContext from "../helper/UserContext";
import UserIcon from "./UserIcon";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 2em;
  background-color: ${(props) => props.theme.primaryBgColor};
  height: 100%;
  grid-column: 1/2;
  overflow-y: scroll;
`;
const Username = styled.div`
  font-size: 0.6em;
`;
const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;
  overflow: hidden;
  padding: 0.2em 0.3em;
  background-color: ${(props) =>
    props.$isSelected ? props.theme.selectedUserNavColor : "inherit"};
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.userNavBgHover};
  }
`;
const BottomElement = styled.div`
  margin-top: auto;
  position: relative;
`;
const Modal = styled.div`
  font-size: 0.5em;
  position: absolute;
  width: 70%;
  bottom: 125%;
  left: 50%;
  border-radius: 6px;
  transform: translateX(-50%);
  opacity: ${(props) => (props.$isVisible ? "1" : "0")};
  transition: opacity 0.3s ease-in-out;
  background-color: ${({ theme }) => theme.popupBgColor};
  text-align: center;
  cursor: pointer;
  & div:first-child {
    border: none;
  }
  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    transform: rotate(45deg) translateY(-50%);
    background-color: ${({ theme }) => theme.popupBgColor};
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: ${({ theme }) => theme.popupBgColor} transparent transparent;
  }
`;
const ModalMenu = styled.div`
  border-top: 1px solid ${({ theme }) => theme.modalBorderColor};
  font-weight: 400;
  padding: 0.4em 0;
  &:hover {
    opacity: 0.5;
  }
`;

const UserNav = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { roomData, selectedRoom, setSelectedRoom } = useContext(UserContext);
  const modalRef = useRef(null);
  const bottomElementRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !bottomElementRef.current.contains(e.target)) {
        setIsVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible]);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  function handleClick(e, chatRoomId) {
    e.preventDefault();
    setSelectedRoom(roomData.find((room) => room.chatRoomId === chatRoomId));
    navigate(`/chat/${chatRoomId}`);
  }
  function togglePopup(e) {
    e.preventDefault();
    setIsVisible(!isVisible);
  }
  function handleLogout(e) {
    e.preventDefault();
    localStorage.clear();
    navigate("/login");
  }
  function handleEditProfile() {}
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
      <BottomElement ref={bottomElementRef}>
        <Modal ref={modalRef} $isVisible={isVisible}>
          <ModalMenu onClick={handleLogout}>Logout</ModalMenu>
          <ModalMenu onClick={handleEditProfile}>Edit Profile</ModalMenu>
        </Modal>
        <UserContainer onClick={togglePopup}>
          <UserIcon url={user?.url} />
          <Username>{user.username}</Username>
        </UserContainer>
      </BottomElement>
    </Wrapper>
  );
};
export default UserNav;
