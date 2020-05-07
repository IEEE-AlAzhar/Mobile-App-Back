import axios from "axios";

import { Committee } from "globals/interfaces/committee.interface";

export let addCommittee = async (committee: Committee) => {
  let response = await axios.post("/api/committees/new", committee);

  return response;
};

export let updateCommittee = async (id: string, committee: Committee) => {
  let {data: updatedCommittee} = await axios.put(`/api/committees/${id}`, committee);

  return updatedCommittee;
};

export let deleteCommittee = async (id: string) => {
  if (window.confirm("Are you sure you want to delete this item ?")) {
    let { data } = await axios.delete(`/api/committees/${id}`);
    return data;
  }
};

export let getCommittees = async () => {
  let { data: committees } = await axios.get("/api/committees/list");

  return committees;
};
