import styled from "styled-components";
import { IoMdEyeOff } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { useState, useRef } from "react";
import AuthNavigation from "./AuthNavigation";
const Wrapper = styled.div`
  max-width: 400px;
  margin: auto;
`;
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
const IconContainer = styled.div`
  position: absolute;
  top: 50%;
  right: 0.5em;
  font-size: 1.5em;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.lightTextColor};
  &:hover {
    cursor: pointer;
  }
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
  height: 2.5em;
  line-height: 2;
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
  const [passwordShown, setPasswordShown] = useState(false);
  const [inputType, setInputType] = useState("password");
  const pwInputRef = useRef(null);
  const pwConfirmInputRef = useRef(null);
  function toggleVisible(e) {
    e.preventDefault();
    setPasswordShown((prev) => !prev);
    setInputType((prev) => {
      return prev === "password" ? "text" : "password";
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (pwInputRef.current) {
      pwInputRef.current.setCustomValidity("");
    }
    if (type !== "login" && pwConfirmInputRef.current) {
      if (pwInputRef.current.value !== pwConfirmInputRef.current.value) {
        pwInputRef.current.setCustomValidity("Passwords do not match.");
        pwInputRef.current.reportValidity();
        return;
      }
    }
    const formData = new FormData(e.target);
    let formJson = {};
    for (let [key, value] of formData.entries()) {
      formJson[key] = value;
    }
    formJson = JSON.stringify(formJson);
    if (formJson.password !== formJson.confirmPassword) {
    }
    console.log(formJson);
  }
  return (
    <Wrapper>
      <StyledForm action="" onSubmit={handleSubmit}>
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
            required={true}
            aria-required={true}
            minLength={4}
            maxLength={30}
          />
          <PwContainer>
            <StyledInput
              type={inputType}
              id="password"
              placeholder="Password"
              name="password"
              required={true}
              aria-required={true}
              minLength={3}
              maxLength={40}
              ref={pwInputRef}
            />
            <IconContainer onClick={toggleVisible}>
              {passwordShown ? <FaEye /> : <IoMdEyeOff />}
            </IconContainer>
          </PwContainer>
          {type !== "login" && (
            <StyledInput
              type={inputType}
              id="confirmPassword"
              placeholder="Confirm Password"
              name="confirmPassword"
              required={true}
              aria-required={true}
              ref={pwConfirmInputRef}
            />
          )}
        </InputContainer>
        <SubmitBtn>{type}</SubmitBtn>
      </StyledForm>
      <AuthNavigation />
    </Wrapper>
  );
};

export default AuthForm;
