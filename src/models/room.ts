import { Activity } from "./activity";

export interface Room {
  id: number;
  name: string;
  color: string;
  activities: Activity[];
}