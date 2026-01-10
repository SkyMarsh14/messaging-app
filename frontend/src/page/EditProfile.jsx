import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import UserContext from "../helper/UserContext";
import UserIcon from "../components/UserIcon";
import FullScreenModal from "../components/FullScreenModal";
import { Link, useNavigate } from "react-router-dom";
import ENDPOINTS from "../api/EndPoints";
import ThemeSwitcher from "../components/ThemeSwitchBtn";

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
const StyledLink = styled(Link)`
  all: unset;
  align-items: center;
  gap: 0.5em;
  width: fit-content;
  display: flex;
  height: 1em;
  cursor: pointer;
  color: ${({ theme }) => theme.lightTextColor};
  transition: 0.2s ease-in-out;
  &:hover {
    color: ${({ theme }) => theme.primaryTextColor};
  }
`;
const StyledSvg = styled.svg`
  height: 100%;
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
const Label = styled.label`
  font-weight: 800;
  font-size: 1.1em;
`;
const Input = styled.input`
  background-color: ${({ theme }) => theme.primaryBgColor};
  color: ${({ theme }) => theme.primaryTextColor};
  border: ${({ theme }) => theme.borderElementSeparator};
  padding: 1em 0.5em;
  border-radius: 0.5em;
  &:focus {
    outline: none;
    border: 1px ${({ theme }) => theme.primaryTextColor} solid;
  }
`;
const Textarea = styled.textarea`
  resize: none;
  background-color: ${({ theme }) => theme.primaryBgColor};
  color: ${({ theme }) => theme.primaryTextColor};
  border: ${({ theme }) => theme.borderElementSeparator};
  padding: 1em 0.5em;
  border-radius: 0.5em;
  &:focus {
    outline: none;
    border: 1px ${({ theme }) => theme.primaryTextColor} solid;
  }
`;
const FormFieldContainer = styled.div`
  margin: 2em 0;
  display: flex;
  gap: 1em;
  flex-direction: column;
`;
const SubmitBtn = styled(PhotoUploadBtn)`
  cursor: ${(props) => (props.$hasChanged ? "pointer" : "not-allowed")};
  padding: 0.5em 3em;
`;
const BtnContainer = styled.div`
  display: flex;
`;
const EditProfile = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);
  function handleChange(e) {
    setHasChanged(true);
  }
  useEffect(() => {
    if (!user) return navigate("/login");
  });
  function handleClick(e) {
    e.preventDefault();
    setShowModal(!showModal);
  }
  async function handleSubmit(e) {
    const url = ENDPOINTS.config();
    e.preventDefault();
    const token = localStorage.getItem("token");
    let formBody = {};
    const formData = new FormData(e.target);
    for (let [key, value] of formData.entries()) {
      formBody[key] = value;
    }
    formBody = JSON.stringify(formBody);
    const response = await fetch(url, {
      body: formBody,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && {
          Authorization: `Bearer ${token}`,
        }),
      },
      mode: "cors",
    });
    if (response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      console.error("Invalid or expired authorization token.");
      return navigate("/login");
    }
    const data = await response.json();
    data.url = user?.url;
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  }
  return (
    <>
      {showModal && <FullScreenModal setShowModal={setShowModal} />}
      <FlexWrapper>
        <ThemeSwitcher />
        <Container>
          <StyledLink viewTransition to="/">
            <StyledSvg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </StyledSvg>
            <div>Back to Dashboard</div>
          </StyledLink>
          <Title>Edit Profile</Title>
          <UserIconContainer>
            <UserIcon $fontSize="3em" url={user?.url} />
            <Username>{user.username}</Username>
            <PhotoUploadBtn onClick={handleClick}>Change Photo</PhotoUploadBtn>
          </UserIconContainer>
          <form action="" onSubmit={handleSubmit}>
            <FormFieldContainer>
              <Label htmlFor="username">Username</Label>
              <Input
                onChange={handleChange}
                maxLength={30}
                minLength={4}
                id="username"
                type="text"
                name="username"
                defaultValue={user.username}
                required
              />
            </FormFieldContainer>
            <FormFieldContainer>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                onChange={handleChange}
                maxLength={300}
                name="bio"
                id="bio"
                defaultValue={user.bio}
                placeholder={!user.bio || "You haven't filled out bio yet."}
              />
            </FormFieldContainer>
            <BtnContainer>
              <SubmitBtn disabled={!hasChanged} $hasChanged={hasChanged}>
                Submit
              </SubmitBtn>
            </BtnContainer>
          </form>
        </Container>
      </FlexWrapper>
    </>
  );
};

export default EditProfile;
