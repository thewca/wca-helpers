import { RankingType } from './rankingType';
import { ResultValue } from './resultValue';

export interface ResultAchievedCondition {
  type: 'resultAchieved';
  scope: RankingType;
  value: ResultValue | null;
}

export interface RankingCondition {
  type: 'ranking';
  scope: RankingType;
  value: number;
}

export interface PercentCondition {
  type: 'percent';
  scope: RankingType;
  value: number;
}

export type ResultCondition =
  | ResultAchievedCondition
  | RankingCondition
  | PercentCondition;

export type QualificationResultCondition = ResultCondition | null;
