import { AttemptResult } from './attemptResult';

export interface Attempt {
  result: AttemptResult;
  reconstruction: string | null;
}
