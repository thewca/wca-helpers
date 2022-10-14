import { Extension } from "./extension";

export type ActivityCode = string;

export interface Activity {
  id: number;
  name: string;
  activityCode: ActivityCode;
  startTime: string;
  endTime: string;
  childActivities: Activity[] | null;
  scrambleSetId?: number | null;
  extensions: Extension[]
}
