import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import UserContext from "../helper/UserContext";
import UserIcon from "../components/UserIcon";
import FullScreenModal from "../components/FullScreenModal";
import { useNavigate } from "react-router-dom";

const FlexWrapper = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.primaryBgColor};
  justify-content: center;
`;
const Container = styled.div`
  padding: 1em;
  max-width: 700px;
  width: 100%;
`;
const Title = styled.div`
  color: ${({ theme }) => theme.primaryTextColor};
  font-size: 1.5em;
  font-weight: 800;
  margin: 1.5em 0;
`;
const UserIconContainer = styled.div`
  display: flex;
  padding: 0.5em 1em;
  border-radius: 1em;
  align-items: center;
  gap: 1em;
  background-color: ${({ theme }) => theme.secondaryBgColor};
`;
const Username = styled.div`
  font-size: 1.5em;
`;
const PhotoUploadBtn = styled.button`
  margin-left: auto;
  color: ${({ theme }) => theme.primaryTextColor};
  box-shadow: none;
  border: none;
  padding: 0.2em 1.5em;
  background-color: ${({ theme }) => theme.uploadBtnBg};
  border-radius: 5px;
  cursor: pointer;
`;

const EditProfile = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    if (!user) return navigate("/login");
  });
  function handleClick(e) {
    e.preventDefault();
    setShowModal(!showModal);
  }
  return (
    <>
      {showModal && <FullScreenModal setShowModal={setShowModal} />}
      <FlexWrapper>
        <Container>
          <Title>Edit Profile</Title>
          <UserIconContainer>
            <UserIcon $fontSize="3em" />
            <Username>{user.username}</Username>
            <PhotoUploadBtn onClick={handleClick}>Change Photo</PhotoUploadBtn>
          </UserIconContainer>
        </Container>
      </FlexWrapper>
    </>
  );
};

export default EditProfile;
