import { Feedback } from "./feedback.interface";
import { Achievement } from "./achievement.interface";

export interface User {
  _id?: string;
  code: string;
  name: string;
  email: string;
  phone: string;
  image: string;
  role: string;
  type: string;
  committee?: string;
  feedbacks?: Feedback[];
  achievements?: Achievement[];
}
