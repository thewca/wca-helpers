import { QualificationResultCondition } from './resultCondition';

export interface Qualification {
  earliestResultDate: string | null;
  latestResultDate: string;
  resultCondition: QualificationResultCondition;
}
