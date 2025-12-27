import styled from "styled-components";
import ConnectionImg from "../assets/connection.svg";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const PlaceHolder = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 450px;
  text-align: center;
`;
const Img = styled.img`
  margin-bottom: 1em;
  width: 100%;
  height: 100%;
`;
const Title = styled.div`
  font-weight: 800;
  font-size: 1.4em;
`;
const ChatWrapper = styled.div`
  width: 100%;
  height: 100%;
`;
const SentMessage = styled.div`
  background-color: ${({ theme }) => theme.senderChatBubble};
  padding: 0.5em 1em;
  max-width: 200px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;
const ReceivedMessage = styled.div`
  background-color: ${({ theme }) => theme.receiverChatBubble};
`;
const Messages = ({ chatData }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (chatData.length === 0) {
    return (
      <Wrapper>
        <PlaceHolder>
          <Img src={ConnectionImg} />
          <Title>You haven't chatted with the user yet. </Title>
        </PlaceHolder>
      </Wrapper>
    );
  }
  return (
    <ChatWrapper>
      {chatData.map((message) =>
        message.authorId === user.id ? (
          <SentMessage key={message.id}>{message.content}</SentMessage>
        ) : (
          <ReceivedMessage key={message.id}>{message.content}</ReceivedMessage>
        )
      )}
    </ChatWrapper>
  );
};
export default Messages;
