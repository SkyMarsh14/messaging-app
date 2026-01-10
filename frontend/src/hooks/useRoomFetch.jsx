import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../helper/UserContext";
import ENDPOINTS from "../api/EndPoints";

const useRoomFetch = () => {
  const { roomData, setRoomData } = useContext(UserContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [needsAuth, setNeedsAuth] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = ENDPOINTS.userRoom();
        setLoading(true);
        if (!localStorage.getItem("token") || !localStorage.getItem("user")) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
        }
        const token = localStorage.getItem("token");
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token && {
              Authorization: `Bearer ${token}`,
            }),
          },
          mode: "cors",
        };
        const response = await fetch(url, options);
        if (!response.ok) {
          if (response.status === 401) {
            console.error("Invalid or expired authorization token.");
            setNeedsAuth(true);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            return navigate("/login");
          }
          throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        setRoomData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return { roomData, setRoomData, error, loading, needsAuth };
};
export default useRoomFetch;
