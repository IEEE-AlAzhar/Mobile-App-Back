import axios from "axios";
import { Feedback } from "globals/interfaces/feedback.interface";

export let addFeedback = async (
  feedback: Feedback,
  userId: string
) => {
  let { data: addedFeedback } = await axios.post(
    `/api/users/${userId}/feedbacks/new`,
    feedback
  );

  return addedFeedback;
};

export let updateFeedback = async (
  id: string,
  feedback: Feedback,
  userId: string
) => {
  let { data: updatedFeedback } = await axios.put(
    `/api/users/${userId}/feedbacks/${id}`,
    feedback
  );

  return updatedFeedback;
};

export let deleteFeedback = async (id: string, userId: string) => {
  let { data } = await axios.delete(`/api/users/${userId}/feedbacks/${id}`);
  return data;
};

export let getFeedbacks = async (userId: string) => {
  let { data: feedbacks } = await axios.get(
    `/api/users/${userId}/feedbacks/list`
  );

  return feedbacks;
};
