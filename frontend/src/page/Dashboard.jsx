import styled from "styled-components";
import useFetch from "../hooks/useFetch.jsx";
import ENDPOINTS from "../api/EndPoints.js";
import UserNav from "../components/UserNav.jsx";
import { Outlet } from "react-router-dom";

const Wrapper = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 330px 1fr;
  color: ${(props) => props.theme.primaryTextColor};
`;
const Dashboard = () => {
  const { data, error, loading, needsAuth } = useFetch(ENDPOINTS.users());
  if (data && !loading) {
    return (
      <Wrapper>
        <UserNav userData={data} />
        <Outlet />
      </Wrapper>
    );
  }
};
export default Dashboard;
