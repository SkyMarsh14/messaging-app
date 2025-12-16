import styled from "styled-components";
import { HiUser } from "react-icons/hi";
const Wrapper = styled.div`
  max-width: 300px;
  display: flex;
  flex-direction: column;
  font-size: 2em;
`;
const Username = styled.div`
  font-size: 0.6em;
`;
const ProfileIcon = styled.div`
  border-radius: 50%;
`;
const IconContainer = styled.div`
  background-color: ${(props) => props.theme.iconBgColor};
  border-radius: 50%;
  padding: 0.25em;
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
  return (
    <Wrapper>
      {userData.map((user) => (
        <UserContainer key={user.id}>
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
