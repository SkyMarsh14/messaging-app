import styled from "styled-components";
import EmptyChat from "./EmptyChat";
import { useEffect, useRef } from "react";

const ChatWrapper = styled.div`
  overflow-y: auto;
  scrollbar-color: ${({ theme }) => theme.scrollBarColor};
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.primaryBgColor};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.scrollBarBgColor};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #777;
  }
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
  const scrollContainerRef = useRef(null);
  // Scroll starts from the bottom when it refreshes or new message is being added.
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [chatData]);

  const user = JSON.parse(localStorage.getItem("user"));
  if (chatData.length === 0) {
    return <EmptyChat />;
  }
  return (
    <ChatWrapper ref={scrollContainerRef}>
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
