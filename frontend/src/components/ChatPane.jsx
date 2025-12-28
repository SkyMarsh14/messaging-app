import styled from "styled-components";
import ENDPOINTS from "../api/EndPoints";
import { useParams } from "react-router-dom";
import BottomChatElement from "./BottomChatElement";
import Messages from "./Messages";
import useFetch from "../hooks/useFetch";
const Wrapper = styled.div`
  padding: 1em;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.primaryBgColor};
  gap: 1em;
`;

const ChatPane = () => {
  const { userId } = useParams();
  const url = ENDPOINTS.messages(userId);
  const { data, setData, error, loading } = useFetch(url, [userId]);
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
