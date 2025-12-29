import styled from "styled-components";
import { HiUser } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
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
  background-color: ${({ theme }) => theme.iconBgColor};
`;
const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;
  padding: 0.2em 0.3em;
  &:hover {
    background-color: ${(props) => props.theme.iconBgHover};
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
const UserNav = ({ userData }) => {
  const navigate = useNavigate();
  function handleClick(e, userId) {
    e.preventDefault();
    navigate(`/chat/${userId}`);
  }
  return (
    <Wrapper>
      {userData.map((user) => (
        <UserContainer onClick={(e) => handleClick(e, user.id)} key={user.id}>
          <IconContainer>
            {user.profile ? (
              <CustomIcon $url={user.profile.url} />
            ) : (
              <DefaultIcon />
            )}
          </IconContainer>
          <Username>{user.username}</Username>
        </UserContainer>
      ))}
    </Wrapper>
  );
};
export default UserNav;
