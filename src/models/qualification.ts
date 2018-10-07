import { AttemptResult } from "./attemptResult";

interface RankingQualification {
  when: string;
  type: 'ranking';
  ranking: number;
}

interface SingleQualification {
  when: string;
  type: 'single';
  single: AttemptResult;
}

interface AverageQualification {
  when: string;
  type: 'average';
  average: AttemptResult;
}

export type Qualification = RankingQualification | SingleQualification | AverageQualification;