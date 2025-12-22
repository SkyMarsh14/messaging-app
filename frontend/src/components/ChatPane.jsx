import styled from "styled-components";
const Wrapper = styled.div``;
const Messages = styled.div``;
const PlaceHolder = styled.div``;

const ChatPane = () => {
  return <Wrapper>{null ? <Messages /> : <PlaceHolder />}</Wrapper>;
};

export default ChatPane;
