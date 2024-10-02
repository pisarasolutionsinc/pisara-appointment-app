export interface BoardModel {
  _id: string;
  order: number;
  name: string;
  category: "open" | "started" | "closed";
  statuses: string;
}
