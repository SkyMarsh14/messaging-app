import styled from "styled-components";
import useRoomFetch from "../hooks/useRoomFetch.jsx";
import UserNav from "../components/UserNav.jsx";
import { Outlet } from "react-router-dom";
import ThemeSwitcher from "../components/ThemeSwitchBtn.jsx";

const Wrapper = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 330px 1fr;
  color: ${(props) => props.theme.primaryTextColor};
`;
const OutletContainer = styled.div`
  border-left: ${({ theme }) => theme.borderElementSeparator};
  height: 100vh;
`;
const Dashboard = () => {
  const { roomData, setRoomData, error, loading } = useRoomFetch();
  if (roomData && !loading) {
    return (
      <Wrapper>
        <ThemeSwitcher />
        <UserNav />
        <OutletContainer>
          <Outlet />
        </OutletContainer>
      </Wrapper>
    );
  }
};
export default Dashboard;
