import styled from "styled-components";
import StyledLoginHero from "../components/StyledLoginIcon";
import AuthForm from "../components/AuthForm";
import hero from "../assets/loginImage.svg";
import ThemeSwitcher from "../components/ThemeSwitchBtn";
const Wrapper = styled.div`
  display: flex;
  font-family: "Poppins", sans-serif;
  height: 100vh;
  width: 100vw;
  background-color: ${({ theme }) => theme.primaryBgColor};
`;
const LeftElement = styled.div`
  flex: 1;
  margin: auto;
`;
const HeroHeadingWrapper = styled.div`
  position: absolute;
  top: 12%;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  max-width: 80%;
`;
const HeroHeadline = styled.div`
  color: ${({ theme }) => theme.primaryTextColor};
  font-size: 5em;
  font-style: normal;
  font-weight: 700;
  line-height: 87.5%; /* 87.5% */
`;
const AppName = styled(HeroHeadline)`
  font-weight: 400;
  margin-bottom: 10px;
`;
const LoginToAccess = styled(HeroHeadline)`
  font-size: 1em;
  font-weight: 500;
  line-height: normal;
`;
const RightElement = styled.div`
  background-color: ${({ theme }) => theme.authBgColor};
  flex: 1;
  position: relative;
`;

const AuthPage = ({ type = "login" }) => {
  const headlineText =
    type === "login"
      ? "Log in to access your account"
      : "Create your account to start messaging";
  return (
    <Wrapper>
      <LeftElement>
        <AuthForm type={type} />
        <ThemeSwitcher></ThemeSwitcher>
      </LeftElement>
      <RightElement>
        <HeroHeadingWrapper>
          <HeroHeadline>Welcome to</HeroHeadline>
          <AppName>messaging app</AppName>
          <LoginToAccess>{headlineText}</LoginToAccess>
        </HeroHeadingWrapper>
        <StyledLoginHero src={hero} />
      </RightElement>
    </Wrapper>
  );
};
export default AuthPage;
