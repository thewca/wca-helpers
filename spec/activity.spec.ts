import { parseActivityCode, activityCodeToName } from '../src/helpers/activity';

describe('Activity Helper', function () {
  describe('parseActivityCode', function () {
    it('Correctly parses a full activity code', function () {
      expect(parseActivityCode('333-r2-g1-a3')).toEqual({
        eventId: '333',
        roundNumber: 2,
        groupNumber: 1,
        attemptNumber: 3,
      });
    });

    it('Handles defaults to null for omitted parts', function () {
      expect(parseActivityCode('333mbf-r1-a2')).toEqual({
        eventId: '333mbf',
        roundNumber: 1,
        groupNumber: null,
        attemptNumber: 2,
      });
      expect(parseActivityCode('444')).toEqual({
        eventId: '444',
        roundNumber: null,
        groupNumber: null,
        attemptNumber: null,
      });
    });
  });

  describe('activityCodeToName', function () {
    it('Produces a readable representation of an activity code', function () {
      expect(activityCodeToName('444-r2-g5')).toEqual(
        '4x4x4 Cube, Round 2, Group 5',
      );
      expect(activityCodeToName('clock')).toEqual('Clock');
      expect(activityCodeToName('333fm-r1-a2')).toEqual(
        '3x3x3 Fewest Moves, Round 1, Attempt 2',
      );
    });
  });
});
