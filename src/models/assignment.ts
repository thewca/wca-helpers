import { AssignmentCode } from './assignmentCode';

export interface Assignment {
  activityId: number;
  assignmentCode: AssignmentCode;
  stationNumber: number | null;
}
