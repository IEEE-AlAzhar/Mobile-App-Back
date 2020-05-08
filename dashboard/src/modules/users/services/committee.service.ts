import axios from "axios";

import { Committee } from "globals/interfaces/committee.interface";

export let addCommittee = async (committee: Committee) => {
  let { data: committees } = await axios.post("/api/committees/new", committee);

  return committees;
};

export let updateCommittee = async (id: string, committee: Committee) => {
  let { data: updatedCommittee } = await axios.put(
    `/api/committees/${id}`,
    committee
  );

  return updatedCommittee;
};

export let deleteCommittee = async (id: string) => {
    let { data } = await axios.delete(`/api/committees/${id}`);
    return data;
};

export let getCommittees = async () => {
  let { data: committees } = await axios.get("/api/committees/list");

  return committees;
};
