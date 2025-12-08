import styled from "styled-components";
import { useRef } from "react";
import { IoMdEyeOff } from "react-icons/io";
const StyledForm = styled.form`
  font-family: "Poppins", sans-serif;
`;
const SubmitBtn = styled.button`
  display: block;
  width: 100%;
  padding: 0.5em 0;
  color: ${({ theme }) => theme.primaryTextColor};
  background-color: ${({ theme }) => theme.primaryBgColor};
  border-radius: 0.5em;
  border: none;
  cursor: pointer;
  &:first-letter {
    text-transform: capitalize;
  }
`;
const PwContainer = styled.div`
  position: relative;
`;
const Icon = styled(IoMdEyeOff)`
  position: absolute;
  top: 50%;
  right: 0.5em;
  font-size: 1.5em;
  transform: translateY(-50%);
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2em;
  margin-bottom: 3em;
`;
const StyledInput = styled.input`
  background-color: inherit;
  width: 100%;
  padding: 0.5em 0;
  border: none;
  color: ${({ theme }) => theme.primaryTextColor};
  border-bottom: 1px ${({ theme }) => theme.lightTextColor} solid;
  &:focus-visible {
    outline: none;
  }
`;
const StyledLegend = styled.legend`
  color: ${({ theme }) => theme.primaryTextColor};
  margin-bottom: 2em;
`;
const TypeDiv = styled.div`
  font-size: 3em;
  font-weight: 700;
  &:first-letter {
    text-transform: capitalize;
  }
`;
const AuthForm = ({ type = "login" }) => {
  return (
    <StyledForm action="">
      <StyledLegend>
        <TypeDiv>{type}</TypeDiv>
        <div>
          {type == "login"
            ? "Enter your account details"
            : "Enter your details to get started"}
        </div>
      </StyledLegend>
      <InputContainer>
        <StyledInput
          type="text"
          id="username"
          autoComplete="true"
          placeholder="Username"
          name="username"
        />
        <PwContainer>
          <StyledInput
            type="password"
            id="password"
            placeholder="Password"
            name="password"
          />
          <Icon />
        </PwContainer>
        {type === "login" && (
          <StyledInput
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            name="confirmPassword"
          />
        )}
      </InputContainer>
      <SubmitBtn>{type}</SubmitBtn>
    </StyledForm>
  );
};

export default AuthForm;
