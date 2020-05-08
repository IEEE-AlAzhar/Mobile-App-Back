import axios from "axios";
import { Achievement } from "globals/interfaces/achievement.interface";

export let addAchievement = async (
  achievement: Achievement,
  userId: string
) => {
  let {
    data: addedAchievement,
  } = await axios.post(`/api/users/${userId}/achievements/new`, 
    achievement);

  return addedAchievement;
};

export let updateAchievement = async (
  id: string,
  achievement: Achievement,
  userId: string
) => {
  let { data: updatedAchievement } = await axios.put(
    `/api/users/${userId}/achievements/${id}`,
    achievement
  );

  return updatedAchievement;
};

export let deleteAchievement = async (id: string, userId: string) => {
  let { data } = await axios.delete(`/api/users/${userId}/achievements/${id}`);
  return data;
};

export let getAchievements = async (userId: string) => {
  let { data: achievements } = await axios.get(
    `/api/users/${userId}/achievements/list`
  );

  return achievements;
};
