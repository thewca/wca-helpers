import { EventId } from './eventId';
import { RankingType } from './rankingType';
import { ResultValue } from './resultValue';

export interface PersonalBest {
  eventId: EventId;
  value: ResultValue;
  worldRanking: number;
  continentalRanking: number;
  nationalRanking: number;
  type: RankingType;
}
