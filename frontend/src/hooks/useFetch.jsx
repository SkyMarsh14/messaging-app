import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../helper/UserContext";

const useFetch = (url, dependancy = []) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [needsAuth, setNeedsAuth] = useState(null);
  const { auth, setAuth } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async (url) => {
      try {
        setLoading(true);
        if (!auth) navigate("/login");
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(auth && { Authorization: `Bearer ${auth}` }),
          },
          mode: "cors",
        };
        const response = await fetch(url, options);
        if (!response.ok) {
          if (response.status === 401) {
            console.error("Invalid or expired authorization token.");
            setAuth(null);
            setNeedsAuth(true);
            localStorage.removeItem("token");
            return navigate("/login");
          }
          throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        setData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData(url);
  }, dependancy);
  return { data, setData, error, loading, needsAuth };
};
export default useFetch;
