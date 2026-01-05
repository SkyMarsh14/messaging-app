import ChatInput from "./ChatInput";
import styled from "styled-components";
const Wrapper = styled.div`
  margin-top: auto;
`;
const BottomChatElement = () => {
  return (
    <Wrapper>
      <ChatInput />
    </Wrapper>
  );
};
export default BottomChatElement;
