import { ResultCondition } from './resultCondition';

export interface RegistrationsParticipationSource {
  type: 'registrations';
}

export interface RoundParticipationSource {
  type: 'round';
  roundId: string;
  resultCondition: ResultCondition | null;
}

export interface LinkedRoundsParticipationSource {
  type: 'linkedRounds';
  roundIds: string[];
  resultCondition: ResultCondition | null;
}

export type ParticipationSource =
  | RegistrationsParticipationSource
  | RoundParticipationSource
  | LinkedRoundsParticipationSource;

export interface ReservedPlaces {
  nationalities: string[];
  reservations: number;
}

export interface ParticipationRuleset {
  participationSource: ParticipationSource;
  reservedPlaces: ReservedPlaces | null;
}
