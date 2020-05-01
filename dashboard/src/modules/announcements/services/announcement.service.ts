import axios from "axios";
import { Announcement } from "globals/interfaces/announcements.interface";

export let addAnnouncement = async (announcement: Announcement) => {
  let response = await axios.post("/announcements", announcement);

  return response;
};

export let updateAnnouncement = async (id: string, announcement: Announcement) => {
  let response = await axios.put(`/announcements/${id}`, announcement);

  return response;
};

export let deleteAnnouncement = async (id: string) => {
  if (window.confirm("Are you sure you want to delete this item ?")) {
    let { data } = await axios.delete(`/announcements/${id}`);
    return data;
  }
};

export let getAnnouncements = async () => {
  let { data: announcements } = await axios.get("/announcements");

  return announcements;
};
