import styled from "styled-components";
import { HiUser } from "react-icons/hi";

const IconContainer = styled.div`
  font-size: ${(props) => props.$fontSize || "1em"};
  border: 0.2px groove ${({ theme }) => theme.lightTextColor};
  width: fit-content;
  border-radius: 50%;
  padding: 0.15em;
  background-color: ${({ theme }) => theme.userNavBgColor};
`;
const DefaultIcon = styled(HiUser)`
  color: ${(props) => props.theme.iconColor};
`;
const CustomIcon = styled.div`
  width: 1em;
  height: 1em;
  background-image: url(${(props) => props.$url});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;

const UserIcon = ({ url, $fontSize }) => {
  return (
    <IconContainer $fontSize={$fontSize}>
      {url ? <CustomIcon $url={url} /> : <DefaultIcon />}
    </IconContainer>
  );
};

export default UserIcon;
