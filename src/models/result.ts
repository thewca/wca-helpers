import { Attempt } from './attempt';
import { AttemptResult } from './attemptResult';
import { RegistrantId } from './person';

export interface Result {
  personId: RegistrantId;
  ranking: number | null;
  attempts: Attempt[];
  best: AttemptResult;
  average: AttemptResult;
}
