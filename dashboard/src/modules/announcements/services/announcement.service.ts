import axios from "axios";
import { Announcement } from "globals/interfaces/announcement.interface";

export let addAnnouncement = async (announcement: Announcement) => {
  let { data: addedAnnouncement } = await axios.post(
    "/api/announcements/new",
    announcement
  );

  return addedAnnouncement;
};

export let updateAnnouncement = async (
  id: string,
  announcement: Announcement
) => {
  let { data: updatedAnnouncement } = await axios.put(
    `/api/announcements/${id}`,
    announcement
  );

  return updatedAnnouncement;
};

export let deleteAnnouncement = async (id: string) => {
  let { data } = await axios.delete(`/api/announcements/${id}`);
  return data;
};

export let getAnnouncements = async () => {
  let { data: announcements } = await axios.get("/api/announcements/list");

  return announcements;
};
