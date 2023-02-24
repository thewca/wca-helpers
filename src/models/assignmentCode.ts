export type DefinedAssignmentCode =
  | 'competitor'
  | 'staff-judge'
  | 'staff-scrambler'
  | 'staff-runner'
  | 'staff-dataentry'
  | 'staff-announcer';

export type AssignmentCode = DefinedAssignmentCode | string;
