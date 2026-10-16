import {
  LinkedRoundsParticipationSource,
  Qualification,
  ReservedPlaces,
  RoundParticipationSource,
} from '../src/models';

const reservedPlaces: ReservedPlaces = {
  nationalities: ['US'],
  count: 8,
};

const resultQualification: Qualification = {
  earliestResultDate: null,
  latestResultDate: '2026-01-01',
  resultCondition: {
    type: 'resultAchieved',
    scope: 'single',
    value: 1000,
  },
};

const rankingQualification: Qualification = {
  earliestResultDate: null,
  latestResultDate: '2026-01-01',
  resultCondition: {
    type: 'ranking',
    scope: 'average',
    value: 16,
  },
};

const roundSource: RoundParticipationSource = {
  type: 'round',
  roundId: '333-r1',
  resultCondition: {
    type: 'ranking',
    scope: 'average',
    value: 16,
  },
};

const linkedRoundsSource: LinkedRoundsParticipationSource = {
  type: 'linkedRounds',
  roundIds: ['333-r1', '333-r2'],
  resultCondition: {
    type: 'percent',
    scope: 'average',
    value: 75,
  },
};

const legacyReservedPlaces: ReservedPlaces = {
  nationalities: ['US'],
  // @ts-expect-error WCIF 2.2 uses ReservedPlaces.count.
  reservations: 8,
};

const nullQualification: Qualification = {
  earliestResultDate: null,
  latestResultDate: '2026-01-01',
  // @ts-expect-error A qualification result condition cannot be null.
  resultCondition: null,
};

const percentQualification: Qualification = {
  earliestResultDate: null,
  latestResultDate: '2026-01-01',
  resultCondition: {
    // @ts-expect-error A qualification cannot use a percent condition.
    type: 'percent',
    scope: 'average',
    value: 75,
  },
};

const nullRoundSource: RoundParticipationSource = {
  type: 'round',
  roundId: '333-r1',
  // @ts-expect-error A round participation source requires a result condition.
  resultCondition: null,
};

const nullLinkedRoundsSource: LinkedRoundsParticipationSource = {
  type: 'linkedRounds',
  roundIds: ['333-r1', '333-r2'],
  // @ts-expect-error A linked-rounds source requires a result condition.
  resultCondition: null,
};

void reservedPlaces;
void resultQualification;
void rankingQualification;
void roundSource;
void linkedRoundsSource;
void legacyReservedPlaces;
void nullQualification;
void percentQualification;
void nullRoundSource;
void nullLinkedRoundsSource;
