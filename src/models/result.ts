import { Attempt } from './attempt';
import { RegistrantId } from './person';
import { ResultValue } from './resultValue';

export interface Result {
  personId: RegistrantId;
  ranking: number | null;
  attempts: Attempt[];
  best: ResultValue;
  average: ResultValue;
}
