import axios from "axios";

import { User } from "globals/interfaces/user.interface";

export default async (data: User) => {
  let response = await axios.post("/users/login", data);

  // Save to localStorage
  localStorage.setItem("user", JSON.stringify(response.data.user));

  return response;
};
