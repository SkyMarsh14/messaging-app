import styled from "styled-components";
import messagingImg from "../assets/messaging.svg";
const Wrapper = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.primaryBgColor};
  height: 100%;
  padding: 2px 0;
  grid-column: 2/3;
  justify-content: center;
  align-items: center;
`;
const CenteredContent = styled.div`
  display: flex;
  height: max-content;
  flex-direction: column;
  align-items: center;
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
  max-width: 360px;
  margin-bottom: 1em;
`;
const TextContainer = styled.div`
  width: 100%;
  text-align: center;
`;
const Title = styled.div`
  font-weight: 800;
  font-size: 1.7em;
`;
const SubText = styled.div`
  font-size: 1.1em;
  color: ${({ theme }) => theme.lightTextColor};
`;
const ChatPlaceHolder = () => {
  return (
    <Wrapper>
      <CenteredContent>
        <Img src={messagingImg} alt="A guy messaging someone." />
        <TextContainer>
          <Title>Pick a chat to start talking</Title>
          <SubText>Say hi when you're ready</SubText>
        </TextContainer>
      </CenteredContent>
    </Wrapper>
  );
};
export default ChatPlaceHolder;
