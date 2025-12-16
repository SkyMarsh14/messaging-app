import styled from "styled-components";
import useFetch from "../hooks/useFetchUsers.jsx";
import ENDPOINTS from "../api/EndPoints.js";
import UserNav from "../components/UserNav.jsx";
const Wrapper = styled.div`
  color: ${(props) => props.theme.primaryTextColor};
`;
const Dashboard = () => {
  const { data, error, loading, needsAuth } = useFetch(ENDPOINTS.users());
  if (data && !loading) {
    return (
      <Wrapper>
        <UserNav userData={data} />
      </Wrapper>
    );
  }
};
export default Dashboard;
