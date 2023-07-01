import { EventId } from './eventId';
import { AttemptResult } from './attemptResult';
import { RankingType } from './rankingType';

export interface PersonalBest {
  eventId: EventId;
  best: AttemptResult;
  worldRanking: number;
  continentalRanking: number;
  nationalRanking: number;
  type: RankingType;
}
