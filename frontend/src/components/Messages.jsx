import styled from "styled-components";
import ConnectionImg from "../assets/connection.svg";
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const PlaceHolder = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 450px;
  text-align: center;
`;
const Img = styled.img`
  margin-bottom: 1em;
  width: 100%;
  height: 100%;
`;
const Title = styled.div`
  font-weight: 800;
  font-size: 1.4em;
`;

const Messages = ({ chatData }) => {
  if (chatData.length === 0) {
    return (
      <Wrapper>
        <PlaceHolder>
          <Img src={ConnectionImg} />
          <Title>You haven't chatted with the user yet. </Title>
        </PlaceHolder>
      </Wrapper>
    );
  }
};
export default Messages;
