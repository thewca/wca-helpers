import { ResultValue } from './resultValue';

export interface Attempt {
  value: ResultValue;
  reconstruction: string | null;
}
