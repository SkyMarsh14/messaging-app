import ENDPOINTS from "./EndPoints";
const login = async (body) => {
  const url = ENDPOINTS.login();
  const response = await fetch(url, {
    body: body,
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
};

export default login;
