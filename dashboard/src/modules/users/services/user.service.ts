import axios from "axios";

import { User } from "globals/interfaces/user.interface";

export let addUser = async (user: User) => {
  let { data: userAdded } = await axios.post("/api/users/register", user);

  return userAdded;
};

export let updateUser = async (id: string, user: User) => {
  let { data: updatedUser } = await axios.put(`/api/users/${id}`, user);

  localStorage.setItem("user", JSON.stringify(updatedUser));

  return updatedUser;
};

export let deleteUser = async (id: string) => {
  let { data } = await axios.delete(`/api/users/${id}`);
  return data;
};

export let getUsers = async () => {
  let { data: users } = await axios.get("/api/users/list");

  return users;
};
