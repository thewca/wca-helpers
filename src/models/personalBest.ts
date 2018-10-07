import { EventId } from "./eventId";
import { AttemptResult } from "./attemptResult";

export interface PersonalBest {
  eventId: EventId;
  best: AttemptResult;
  worldRanking: number;
  continentalRanking: number;
  nationalRanking: number;
  type: 'single' | 'average';
}