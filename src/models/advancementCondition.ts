import { AttemptResult } from './attemptResult';

interface RankingAdvancement {
  type: 'ranking';
  level: number;
}

interface PercentAdvancement {
  type: 'percent';
  level: number;
}

interface ResultAdvancement {
  type: 'attemptResult';
  level: AttemptResult;
}

export type AdvancementCondition =
  | RankingAdvancement
  | PercentAdvancement
  | ResultAdvancement;
