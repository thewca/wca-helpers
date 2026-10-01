import {
  Attempt,
  Competition,
  EventId,
  ParticipationRuleset,
  ParticipationSource,
  Qualification,
  ReservedPlaces,
  ResultCondition,
  RoundFormat,
} from '../src/models';

const eventIds: EventId[] = [
  '222',
  '333',
  '444',
  '555',
  '666',
  '777',
  '333bf',
  '333fm',
  '333oh',
  'clock',
  'minx',
  'pyram',
  'skewb',
  'sq1',
  '444bf',
  '555bf',
  '333mbf',
  'fto',
  'magic',
  'mmagic',
  '333mbo',
  '333ft',
];

const roundFormats: RoundFormat[] = ['1', '2', '3', '5', 'a', 'h', 'm'];

const resultConditions: Array<ResultCondition | null> = [
  null,
  { type: 'resultAchieved', scope: 'single', value: 1000 },
  { type: 'resultAchieved', scope: 'average', value: null },
  { type: 'ranking', scope: 'single', value: 16 },
  { type: 'percent', scope: 'average', value: 75 },
];

const participationSources: ParticipationSource[] = [
  { type: 'registrations' },
  {
    type: 'round',
    roundId: 'fto-r1',
    resultCondition: null,
  },
  {
    type: 'linkedRounds',
    roundIds: ['fto-r1', 'fto-r2'],
    resultCondition: resultConditions[4],
  },
];

const qualifications: Qualification[] = resultConditions.map(
  (resultCondition) => ({
    earliestResultDate: null,
    latestResultDate: '2026-01-01',
    resultCondition,
  }),
);

export const competition: Competition = {
  formatVersion: '2.1.1',
  id: 'Example2026',
  name: 'Example 2026',
  shortName: 'Example 2026',
  series: {
    id: 'ExampleSeries2026',
    name: 'Example Series 2026',
    shortName: 'Example Series',
    competitionIds: ['Example2026'],
  },
  persons: [
    {
      registrantId: 1,
      name: 'Example Competitor',
      wcaUserId: 1,
      wcaId: '2026EXAM01',
      countryIso2: 'US',
      gender: 'o',
      birthdate: '2000-01-01',
      email: 'competitor@example.com',
      avatar: {
        url: 'https://example.com/avatar.png',
        thumbUrl: 'https://example.com/avatar-thumb.png',
      },
      roles: ['organizer', 'delegate', 'custom-role'],
      registration: {
        wcaRegistrationId: 1,
        eventIds: ['fto'],
        status: 'accepted',
        guests: 1,
        comments: 'Registration comment',
        administrativeNotes: 'Administrative note',
        isCompeting: true,
      },
      assignments: [
        {
          activityId: 1,
          assignmentCode: 'staff-judge',
          stationNumber: null,
        },
      ],
      personalBests: [
        {
          eventId: 'fto',
          value: 1234,
          worldRanking: 1,
          continentalRanking: 1,
          nationalRanking: 1,
          type: 'single',
        },
      ],
      extensions: [
        {
          id: 'org.worldcubeassociation.example.person',
          specUrl: 'https://example.com/person-extension.json',
          data: { example: true },
        },
      ],
    },
    {
      registrantId: null,
      name: 'Example Organizer',
      wcaUserId: 2,
      countryIso2: 'CA',
      registration: null,
      extensions: [],
    },
  ],
  events: [
    {
      id: 'fto',
      rounds: [
        {
          id: 'fto-r1',
          linkedRounds: null,
          format: 'a',
          timeLimit: {
            centiseconds: 60000,
            cumulativeRoundIds: [],
          },
          cutoff: {
            numberOfAttempts: 2,
            resultValue: 3000,
          },
          participationRuleset: {
            participationSource: participationSources[0],
            reservedPlaces: null,
          },
          results: [
            {
              personId: 1,
              ranking: null,
              attempts: [
                { value: 1234, reconstruction: "R U R'" },
                { value: -1, reconstruction: null },
              ],
              best: 1234,
              average: -1,
            },
          ],
          scrambleSetCount: 1,
          scrambleSets: [
            {
              id: 1,
              scrambles: ['R U'],
              extraScrambles: ['R U2'],
            },
          ],
          extensions: [
            {
              id: 'org.worldcubeassociation.example.round',
              specUrl: 'https://example.com/round-extension.json',
              data: { example: true },
            },
          ],
        },
        {
          id: 'fto-r2',
          linkedRounds: ['fto-r2', 'fto-r3'],
          format: 'h',
          timeLimit: null,
          cutoff: null,
          participationRuleset: {
            participationSource: participationSources[1],
            reservedPlaces: {
              nationalities: ['US', 'CA'],
              reservations: 8,
            },
          },
          results: [
            {
              personId: 1,
              ranking: 1,
              attempts: [],
              best: 1234,
              average: 0,
            },
          ],
          extensions: [],
        },
        {
          id: 'fto-r3',
          linkedRounds: ['fto-r2', 'fto-r3'],
          format: '5',
          timeLimit: null,
          cutoff: null,
          participationRuleset: {
            participationSource: participationSources[2],
            reservedPlaces: null,
          },
          results: [],
          extensions: [],
        },
      ],
      competitorLimit: 100,
      qualification: qualifications[1],
      extensions: [],
    },
  ],
  schedule: {
    startDate: '2026-01-01',
    numberOfDays: 1,
    venues: [
      {
        id: 1,
        name: 'Example Venue',
        latitudeMicrodegrees: 1000000,
        longitudeMicrodegrees: -1000000,
        countryIso2: 'US',
        timezone: 'America/Los_Angeles',
        rooms: [
          {
            id: 1,
            name: 'Main Room',
            color: '#ffffff',
            activities: [
              {
                id: 1,
                name: 'FTO, Round 1',
                activityCode: 'fto-r1',
                startTime: '2026-01-01T09:00:00Z',
                endTime: '2026-01-01T10:00:00Z',
                childActivities: [
                  {
                    id: 2,
                    name: 'FTO, Round 1, Group 1',
                    activityCode: 'fto-r1-g1',
                    startTime: '2026-01-01T09:00:00Z',
                    endTime: '2026-01-01T10:00:00Z',
                    childActivities: [],
                    scrambleSetId: 1,
                    extensions: [],
                  },
                ],
                scrambleSetId: null,
                extensions: [],
              },
            ],
            extensions: [],
          },
        ],
        extensions: [],
      },
    ],
  },
  competitorLimit: null,
  extensions: [
    {
      id: 'org.worldcubeassociation.example.competition',
      specUrl: 'https://example.com/competition-extension.json',
      data: { example: true },
    },
  ],
  registrationInfo: {
    openTime: '2025-11-01T00:00:00Z',
    closeTime: '2025-12-01T00:00:00Z',
    baseEntryFee: 2000,
    currencyCode: 'USD',
    onTheSpotRegistration: false,
    useWcaRegistration: true,
  },
};

const invalidReservedPlaces: ReservedPlaces = {
  nationalities: ['US'],
  // @ts-expect-error WCIF 2 uses ReservedPlaces.reservations.
  count: 8,
};

const invalidParticipationRuleset: ParticipationRuleset = {
  // @ts-expect-error WCIF 2 participationSource is an object.
  participationSource: null,
  reservedPlaces: null,
};

// @ts-expect-error WCIF 2 uses Attempt.value instead of Attempt.result.
const wcif1Attempt: Attempt = { result: 800, reconstruction: null };

void eventIds;
void roundFormats;
void resultConditions;
void participationSources;
void qualifications;
void competition;
void invalidReservedPlaces;
void invalidParticipationRuleset;
void wcif1Attempt;
