import styled from "styled-components";
import ENDPOINTS from "../api/EndPoints";
import { useParams } from "react-router-dom";
import BottomChatElement from "./BottomChatElement";
import Messages from "./Messages";
import useFetch from "../hooks/useFetch";
const Wrapper = styled.div`
  grid-column: 2/3;
  position: relative; // Prevents bottom element overflow.
  margin: 1em;
`;

const ChatPane = () => {
  const { userId } = useParams();
  const url = ENDPOINTS.messages(userId);
  const { data, setData, error, loading } = useFetch(url, userId);
  if (error) {
    throw new Error("Requested route does not exist"); // Rethrow the error outside of the hook to display Error boundary.
  }
  if (data && !loading) {
    return (
      <Wrapper>
        <Messages chatData={data} />
        <BottomChatElement setChatData={setData} />
      </Wrapper>
    );
  }
};

export default ChatPane;
