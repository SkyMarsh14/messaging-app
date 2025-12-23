import ChatInput from "./ChatInput";
import styled from "styled-components";
const Wrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
`;
const BottomChatElement = () => {
  return (
    <Wrapper>
      <ChatInput />
    </Wrapper>
  );
};
export default BottomChatElement;
