import styled from "styled-components";
import { HiUser } from "react-icons/hi";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 2em;
  background-color: ${(props) => props.theme.userNavBgColor};
  overflow-y: auto;
  height: 100vh;
  grid-column: 1/2;
`;
const Username = styled.div`
  font-size: 0.6em;
`;
const ProfileIcon = styled.div`
  border-radius: 50%;
`;
const IconContainer = styled.div`
  border-radius: 50%;
  padding: 0.15em;
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
const CustomIcon = styled(ProfileIcon)`
  background-image: url(${(props) => props.url});
`;
const UserNav = ({ userData }) => {
  function handleClick(e) {
    e.preventDefault();
  }
  return (
    <Wrapper>
      {userData.map((user) => (
        <UserContainer onClick={handleClick} key={user.id}>
          {user.profile ? (
            <CustomIcon src={user.profile.url} />
          ) : (
            <IconContainer>
              <DefaultIcon />
            </IconContainer>
          )}
          <Username>{user.username}</Username>
        </UserContainer>
      ))}
    </Wrapper>
  );
};
export default UserNav;
