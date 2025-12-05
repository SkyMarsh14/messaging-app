import styled from "styled-components";
const StyledForm = styled.form``;
const SubmitBtn = styled.button`
  display: block;
  &:first-letter {
    text-transform: capitalize;
  }
`;

const AuthForm = ({ type = "login" }) => {
  return (
    <StyledForm action="">
      <div>
        <label htmlFor="">Username</label>
        <input type="text" />
      </div>
      <div>
        <label htmlFor="">Password</label>
        <input type="password" />
      </div>
      {type === "login" && (
        <div>
          <label htmlFor="">Confirm Password</label>
          <input type="text" />
        </div>
      )}
      <SubmitBtn>{type}</SubmitBtn>
    </StyledForm>
  );
};

export default AuthForm;
