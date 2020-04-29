import axios from "axios";

import { User } from "@globals/interfaces/user.interface";

export let addUser = async (user: User) => {
  let response = await axios.post("/users/register", user);

  return response;
};

export let updateUser = async (id, user: User) => {
  let response = await axios.put(`/users/${id}`, user);

  localStorage.setItem("user", JSON.stringify(user));

  return response;
};

export let deleteUser = async (id) => {
  if (window.confirm("Are you sure you want to delete this item ?")) {
    let { data } = await axios.delete(`/users/${id}`);
    return data;
  }
};

export let getUsers = async () => {
  let { data: users } = await axios.get("/users/list");

  return users;
};
