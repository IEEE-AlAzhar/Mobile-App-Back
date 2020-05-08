import axios from "axios";

export default async (data: {code: string}) => {
  let response = await axios.post("/api/users/login", data);

  localStorage.setItem("user", JSON.stringify(response.data.user));

  return response;
};
