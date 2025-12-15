import styled from "styled-components";
const Wrapper = styled.div`
  max-width: 300px;
`;
const ProfileIcon = styled.div`
  border-radius: 50%;
`;
const UserNav = (userData) => {
  return (
    <Wrapper>
      {userData.map((user) => (
        <div>
          <ProfileIcon />
          <div>{user.username}</div>
        </div>
      ))}
    </Wrapper>
  );
};
export default UserNav;
