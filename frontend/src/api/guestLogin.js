import ENDPOINTS from "./EndPoints";
const guestLogin = async () => {
  const url = ENDPOINTS.guestLogin();
  try {
    const response = await fetch(url);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    const json = await response.json();
    if (response.ok) {
      localStorage.setItem("token", json.token);
      localStorage.setItem("user", JSON.stringify(json.user));
    }
    return { json, response };
  } catch (err) {
    throw new Error(err);
  }
};

export default guestLogin;
