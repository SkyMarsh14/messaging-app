import styled from "styled-components";
import useFetch from "../hooks/useFetchUsers.jsx";
import ENDPOINTS from "../api/EndPoints.js";
const Wrapper = styled.div``;
const Dashboard = () => {
  const { data, error, loaidng, needsAuth } = useFetch(ENDPOINTS.users());

  return <Wrapper></Wrapper>;
};
export default Dashboard;
