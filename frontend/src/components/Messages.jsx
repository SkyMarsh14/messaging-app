import styled from "styled-components";
import EmptyChat from "./EmptyChat";

const ChatWrapper = styled.div`
  height: 100%;
  overflow-y: auto;
`;
const ChatBubble = styled.div`
  padding: 0.5em 1em;
  max-width: 200px;
  border-radius: 8px;
  margin: 0.8em;
`;
const SentMessage = styled(ChatBubble)`
  background-color: ${({ theme }) => theme.sentChatBubble};
  border-top-right-radius: 0;
`;
const ReceivedMessage = styled(ChatBubble)`
  background-color: ${({ theme }) => theme.receivedChatBubble};
  border-top-left-radius: 0;
`;
const Messages = ({ chatData }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (chatData.length === 0) {
    return <EmptyChat />;
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
