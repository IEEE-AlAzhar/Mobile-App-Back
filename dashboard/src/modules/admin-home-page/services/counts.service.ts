import axios from "axios";

export let getCounts = async () => {
  let { data: counts } = await axios.get("/api/items/list");

  return counts;
};
