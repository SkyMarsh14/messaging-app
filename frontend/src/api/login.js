import ENDPOINTS from "./EndPoints";
const login = async (body) => {
  const url = ENDPOINTS.login();
  try {
    const response = await fetch(url, {
      body,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    localStorage.removeItem("token");
    const json = await response.json();
    if (response.ok) {
      localStorage.setItem("token", json.token);
    }
    return { json, response };
  } catch (err) {
    throw new Error(err);
  }
};

export default login;
