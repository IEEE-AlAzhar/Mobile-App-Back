export interface User {
  _id?: string;
  name: string;
  phone: number;
  image: string;
  role: string;
  type: string;
  committee: string;
  feedbacks: {
    _id: string;
    title: string;
    date: string;
    body: string;
  }[];
  achievements: {
    _id: string;
    title: string;
    date: string;
    description: string;
  }[];
}
