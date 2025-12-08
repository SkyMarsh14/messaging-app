import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const Wrapper = styled.div`
  display: flex;
  font-size: 0.9em;
  gap: 3em;
  position: absolute;
  bottom: 5em;
  align-items: center;
`;
const Message = styled.div`
  color: ${({ theme }) => theme.lightTextColor};
`;
const NavButton = styled.button`
  color: ${({ theme }) => theme.primaryTextColor};
  background-color: ${({ theme }) => theme.btnBgColor};
  border: none;
  border-radius: 5px;
  padding: 0.5em 1em;
  cursor: pointer;
`;
const AuthNavigation = ({ type = "login" }) => {
  const navigate = useNavigate();
  function handleClick(e) {
    e.preventDefault();
    let nav;
    nav = type === "login" ? "signup" : "login";
    navigate(nav);
  }
  return (
    <Wrapper>
      <Message>Don't have an account?</Message>
      <NavButton onClick={handleClick}>
        {type === "login" ? "Sign up" : "Login"}
      </NavButton>
    </Wrapper>
  );
};

export default AuthNavigation;
