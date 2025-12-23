import styled from "styled-components";
import ENDPOINTS from "../api/EndPoints";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import BottomChatElement from "./BottomChatElement";
const Wrapper = styled.div`
  grid-column: 2/3;
  position: relative; // Prevents bottom element overflow.
`;
const Messages = styled.div``;

const ChatPane = () => {
  const { userId } = useParams();
  const url = ENDPOINTS.messages(userId);
  const { data, error, loading, needsAuth } = useFetch(url);
  if (error) {
    throw new Error("Requested route does not exist"); // Rethrow the error outside of the hook to display Error boundary.
  }
  return (
    <Wrapper>
      <Messages></Messages>
      <BottomChatElement />
    </Wrapper>
  );
};

export default ChatPane;
