import { AssignmentCode } from "./assignmentCode";

export interface Assignment {
  activityId: number;
  stationNumber?: number;
  assignmentCode: AssignmentCode;
}
