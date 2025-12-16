import styled from "styled-components";
import { HiUser } from "react-icons/hi";
const Wrapper = styled.div`
  max-width: 300px;
`;
const ProfileIcon = styled.div`
  border-radius: 50%;
`;
const DefaultIcon = styled(HiUser)`
  color: ${(props) => props.src};
`;
const CustomIcon = styled(ProfileIcon)`
  background-image: url(${(props) => props.color});
`;
const UserNav = ({ userData }) => {
  return (
    <Wrapper>
      {userData.map((user) => (
        <div key={user.id}>
          {user.profile ? (
            <CustomIcon src={user.profile.url} />
          ) : (
            <DefaultIcon color={user.color} />
          )}
          <div>{user.username}</div>
        </div>
      ))}
    </Wrapper>
  );
};
export default UserNav;
