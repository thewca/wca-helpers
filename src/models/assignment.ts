import { AssignmentCode } from "./assignmentCode";

export interface Assignment {
  activityId: string;
  stationNumber?: number;
  assignmentCode: AssignmentCode;
}