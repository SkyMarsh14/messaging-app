import styled from "styled-components";
import { IoMdEyeOff } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { FaCircleExclamation } from "react-icons/fa6";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AuthNavigation from "./AuthNavigation";
import login from "../api/login.js";
import signup from "../api/signup.js";
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
  margin-top: 3em;
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
const ErrorContainer = styled.ul`
  display: grid;
  gap: 1em;
  list-style-type: none;
  padding-inline-start: 0;
  color: ${({ theme }) => theme.primaryTextColor};
`;
const ErrorMsg = styled.li`
  padding: 0 0.5em;
  margin: 1.5em 0;
  display: flex;
  align-items: center;
  gap: 0.5em;
  background-color: ${({ theme }) => theme.errorBgColor};
  border-radius: 5px;
`;
const AuthForm = ({ type = "login" }) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [inputType, setInputType] = useState("password");
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();
  const pwInputRef = useRef(null);
  const pwConfirmInputRef = useRef(null);
  function toggleVisible(e) {
    e.preventDefault();
    setPasswordShown((prev) => !prev);
    setInputType((prev) => {
      return prev === "password" ? "text" : "password";
    });
  }
  function handlePasswordChange() {
    pwInputRef?.current.setCustomValidity("");
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setErrors(null);
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
    let formBody = {};
    for (let [key, value] of formData.entries()) {
      formBody[key] = value;
    }
    formBody = JSON.stringify(formBody);
    if (type === "login") {
      const { json, response } = await login(formBody);
      if (response.status === 200) {
        navigate("/dashboard");
      } else if (json?.errors) {
        setErrors(json.errors);
      } else if (response.status === 401) {
        setErrors([
          { msg: "Incorrect username or password. Please try again" },
        ]);
      }
    } else if (type === "sign up") {
      const { json, response } = await signup(formBody);
      if (response.status === 200) {
        navigate("/login");
      } else {
        setErrors(json.errors);
      }
    }
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
              onChange={handlePasswordChange}
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
        {errors && (
          <ErrorContainer>
            {errors.map((err, index) => (
              <>
                <ErrorMsg key={index}>
                  <FaCircleExclamation />
                  {err.msg}
                </ErrorMsg>
              </>
            ))}
          </ErrorContainer>
        )}
        <SubmitBtn>{type}</SubmitBtn>
      </StyledForm>
      <AuthNavigation type={type} />
    </Wrapper>
  );
};

export default AuthForm;
