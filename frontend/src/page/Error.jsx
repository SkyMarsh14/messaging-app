import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const Wrapper = styled.div`
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  color: ${({ theme }) => theme.primaryTextColor};
`;
const MessageContainer = styled.div`
  width: 45vw;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.4em;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  gap: 0.2em;
`;
const HomeLink = styled.button`
  margin-top: 1em;
  width: 30%;
  background-color: ${({ theme }) => theme.primaryBgColor};
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.bodyBgColor};
  color: ${({ theme }) => theme.primaryTextColor};
  cursor: pointer;
  transition: filter 0.2s;
  &:hover {
    filter: brightness(80%);
  }
`;

const Error = () => {
  const navigate = useNavigate();
  function handleClick(e) {
    e.preventDefault();
    navigate("/");
  }
  return (
    <>
      <Wrapper>
        <MessageContainer>
          <h1>404</h1>
          <p>Oops! That page can't be found.</p>
          <div>The page you are looking for might be deleted</div>
          <HomeLink onClick={handleClick}>Go To Home</HomeLink>
        </MessageContainer>
      </Wrapper>
    </>
  );
};
export default Error;
