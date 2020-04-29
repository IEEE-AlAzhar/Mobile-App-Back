import axios from "axios";

export default async () => {
  let response = await axios.get("/users/logout");

  // Clear the localStorage
  localStorage.removeItem("user");

  return response;
};
