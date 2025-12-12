import ENDPOINTS from "./EndPoints";
const signup = async (body) => {
  const url = ENDPOINTS.signup();
  const response = await fetch(url, {
    body,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
  return { json, response };
};
export default signup;
