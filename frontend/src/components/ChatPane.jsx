import styled from "styled-components";
import ENDPOINTS from "../api/EndPoints";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Error from "../page/Error";
const Wrapper = styled.div`
  grid-column: 2/3;
`;
const Messages = styled.div``;

const ChatPane = () => {
  const { userId } = useParams();
  const url = ENDPOINTS.messages(userId);
  const { data, error, loading, needsAuth } = useFetch(url);
  if (error) {
    throw new Error("Requested route does not exist");
  }
  return (
    <Wrapper>
      <Messages></Messages>
    </Wrapper>
  );
};

export default ChatPane;
