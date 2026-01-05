import styled from "styled-components";
import { useParams } from "react-router-dom";
import useFetchChatData from "../hooks/useFetchChatData";
import BottomChatElement from "./BottomChatElement";
import Messages from "./Messages";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.primaryBgColor};
  gap: 1em;
`;

const ChatPane = () => {
  const { chatRoomId } = useParams();
  const { chatData, setChatData, error, loading } = useFetchChatData(
    chatRoomId,
    [chatRoomId]
  );
  if (error) {
    throw new Error(error); // Rethrow the error outside of the hook to display Error boundary.
  }
  if (chatData && !loading) {
    return (
      <Wrapper>
        <Messages />
        <BottomChatElement />
      </Wrapper>
    );
  }
};

export default ChatPane;
