import styled from "styled-components";
import ENDPOINTS from "../api/EndPoints";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
const Wrapper = styled.div`
  grid-column: 2/3;
`;
const Messages = styled.div``;

const ChatPane = () => {
  const { chatRoomId } = useParams();
  const url = ENDPOINTS.messages(chatRoomId);
  const { data, error, loading, needsAuth } = useFetch(url);

  return (
    <Wrapper>
      <Messages></Messages>
    </Wrapper>
  );
};

export default ChatPane;
