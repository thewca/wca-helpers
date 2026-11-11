import { ResultCondition } from './resultCondition';

export interface RegistrationsParticipationSource {
  type: 'registrations';
}

export interface RoundParticipationSource {
  type: 'round';
  roundId: string;
  resultCondition: ResultCondition;
}

export interface LinkedRoundsParticipationSource {
  type: 'linkedRounds';
  roundIds: string[];
  resultCondition: ResultCondition;
}

export type ParticipationSource =
  | RegistrationsParticipationSource
  | RoundParticipationSource
  | LinkedRoundsParticipationSource;

export interface ReservedPlaces {
  nationalities: string[];
  count: number;
}

export interface ParticipationRuleset {
  participationSource: ParticipationSource | null;
  reservedPlaces: ReservedPlaces | null;
}
