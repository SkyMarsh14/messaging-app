import styled from "styled-components";
import EmptyChat from "./EmptyChat";
import { useEffect, useRef } from "react";
import { formatDistance } from "date-fns";

const ChatWrapper = styled.div`
  overflow-y: auto;
  padding: 0 1em;
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
  padding: 0.3em 0.8em;
  border-radius: 10px;
  max-width: 70%;
  width: fit-content;
`;
const SentMessageBubble = styled(ChatBubble)`
  background-color: ${({ theme }) => theme.sentChatBubble};
`;
const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.8em;
`;
const ReceivedMessageBubble = styled(ChatBubble)`
  background-color: ${({ theme }) => theme.receivedChatBubble};
`;
const SentMessageContainer = styled(MessageContainer)`
  align-items: flex-end;
`;
const Time = styled.div`
  font-size: 0.8em;
`;
const ReceivedMessageContainer = styled(MessageContainer)``;
const Messages = ({ chatData }) => {
  const scrollContainerRef = useRef(null);
  const firstRender = useRef(true);
  // Scroll starts from the bottom when new messages are added.
  useEffect(() => {
    if (scrollContainerRef.current) {
      if (firstRender.current) {
        scrollContainerRef.current.scrollTop =
          scrollContainerRef.current.scrollHeight;
        firstRender.current = false;
        return;
      }
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
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
          <SentMessageContainer key={message.id}>
            <SentMessageBubble>{message.content}</SentMessageBubble>
            <Time>{formatDistance(new Date(), message.createdAt)} ago</Time>
          </SentMessageContainer>
        ) : (
          <ReceivedMessageContainer key={message.id}>
            <ReceivedMessageBubble>{message.content}</ReceivedMessageBubble>
            <Time>{formatDistance(new Date(), message.createdAt)} ago</Time>
          </ReceivedMessageContainer>
        )
      )}
    </ChatWrapper>
  );
};
export default Messages;
