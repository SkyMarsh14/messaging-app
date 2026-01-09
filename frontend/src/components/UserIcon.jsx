import styled from "styled-components";
import { HiUser } from "react-icons/hi";

const IconContainer = styled.div`
  font-size: ${(props) => props.$fontSize || "1.3em"};
`;
const DefaultIcon = styled(HiUser)`
  border: 0.2px groove ${({ theme }) => theme.lightTextColor};
  color: ${(props) => props.theme.iconColor};
  background-color: ${({ theme }) => theme.userNavBgColor};
  border-radius: 50%;
`;
const CustomIcon = styled.div`
  background-color: ${({ theme }) => theme.userNavBgColor};
  border: 0.2px groove ${({ theme }) => theme.lightTextColor};
  border-radius: 50%;
  width: 1em;
  height: 1em;
  background-image: url(${(props) => props.$url});
  background-position: center;
  background-size: cover;
  background-position: center;
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
