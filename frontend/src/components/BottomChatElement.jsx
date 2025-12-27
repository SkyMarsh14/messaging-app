import ChatInput from "./ChatInput";
import styled from "styled-components";
const Wrapper = styled.div``;
const BottomChatElement = ({ setChatData }) => {
  return (
    <Wrapper>
      <ChatInput setChatData={setChatData} />
    </Wrapper>
  );
};
export default BottomChatElement;
