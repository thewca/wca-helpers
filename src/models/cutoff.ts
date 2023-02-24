import { AttemptResult } from './attemptResult';

export interface Cutoff {
  numberOfAttempts: number;
  attemptResult: AttemptResult;
}
