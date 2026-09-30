import {
  Attempt,
  Competition,
  LinkedRoundsParticipationSource,
  ParticipationRuleset,
  PersonalBest,
  Qualification,
  ResultCondition,
  Round,
} from '../src/models';

const conditions: ResultCondition[] = [
  { type: 'resultAchieved', scope: 'single', value: 1000 },
  { type: 'resultAchieved', scope: 'average', value: null },
  { type: 'ranking', scope: 'average', value: 16 },
  { type: 'percent', scope: 'single', value: 75 },
];

const linkedRoundsSource: LinkedRoundsParticipationSource = {
  type: 'linkedRounds',
  roundIds: ['333-r1', '333-r2'],
  resultCondition: conditions[2],
};

const participationRuleset: ParticipationRuleset = {
  participationSource: linkedRoundsSource,
  reservedPlaces: {
    nationalities: ['US', 'CA'],
    count: 8,
  },
};

const round: Round = {
  id: '333-r1',
  linkedRounds: ['333-r1', '333-r2'],
  format: 'h',
  timeLimit: null,
  cutoff: {
    numberOfAttempts: 2,
    resultValue: 1000,
  },
  participationRuleset,
  results: [
    {
      personId: 1,
      ranking: 1,
      attempts: [{ value: 800, reconstruction: null }],
      best: 800,
      average: 0,
    },
  ],
  extensions: [],
};

const qualification: Qualification = {
  earliestResultDate: null,
  latestResultDate: '2026-01-01',
  resultCondition: {
    type: 'ranking',
    scope: 'average',
    value: 100,
  },
};

const competition: Competition = {
  formatVersion: '2.0.0',
  id: 'Example2026',
  name: 'Example 2026',
  shortName: 'Example 2026',
  series: null,
  persons: [],
  events: [
    {
      id: '333',
      rounds: [round],
      competitorLimit: null,
      qualification,
      extensions: [],
    },
  ],
  schedule: {
    startDate: '2026-01-01',
    numberOfDays: 1,
    venues: [],
  },
  competitorLimit: null,
  extensions: [],
  registrationInfo: {
    openTime: '2025-11-01T00:00:00Z',
    closeTime: '2025-12-01T00:00:00Z',
    baseEntryFee: 2000,
    currencyCode: 'USD',
    onTheSpotRegistration: false,
    useWcaRegistration: true,
  },
};

const personalBest: PersonalBest = {
  eventId: '333',
  value: 800,
  worldRanking: 1,
  continentalRanking: 1,
  nationalRanking: 1,
  type: 'single',
};

// @ts-expect-error WCIF 2 uses Attempt.value instead of Attempt.result.
const wcif1Attempt: Attempt = { result: 800, reconstruction: null };

void competition;
void personalBest;
void wcif1Attempt;
