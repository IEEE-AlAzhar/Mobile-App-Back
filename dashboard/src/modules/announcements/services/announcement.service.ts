import axios from "axios";
import { Announcement } from "@globals/interfaces/announcements.interface";

export let addAnnouncement = async (announcement: Announcement) => {
  let response = await axios.post("/announcements", announcement);

  return response;
};

export let updateAnnouncement = async (id, announcement: Announcement) => {
  let response = await axios.put(`/announcements/${id}`, announcement);

  localStorage.setItem("user", JSON.stringify(announcement));

  return response;
};

export let deleteAnnouncement = async (id) => {
  if (window.confirm("Are you sure you want to delete this item ?")) {
    let { data } = await axios.delete(`/announcements/${id}`);
    return data;
  }
};

export let getAnnouncements = async () => {
  let { data: users } = await axios.get("/announcements");

  return users;
};
