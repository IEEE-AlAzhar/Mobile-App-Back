export interface Announcement {
  _id?: string;
  title: string;
  body: string;
  date: string;
  type: "operation" | "technical" | "general";
  cover?: string;
}
