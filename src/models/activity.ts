import { Extension } from "./extension";

export interface Activity {
  id: number;
  name: string;
  activityCode: string;
  startTime: string;
  endTime: string;
  childActivities?: Activity[] | null;
  scrambleSetId?: number | null;
  extensions: Extension[]
}