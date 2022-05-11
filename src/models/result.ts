import { Attempt } from "./attempt";
import { AttemptResult } from "./attemptResult";

export interface Result {
  personId: number;
  ranking?: number;
  attempts: Attempt[];
  best: AttemptResult;
  average: AttemptResult;
}