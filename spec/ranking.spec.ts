import { expect, jest, test } from '@jest/globals';
import { Result } from '../src/models/result';
import { rank } from '../src/helpers/ranking';

expect.extend({
  toHaveRanking(actual, expected) {
    var result = {
      pass: false,
      message: () => '',
    };

    if (expected === undefined) {
      result.pass = actual.hasOwnProperty('ranking') && actual.ranking! > 0;
      result.message = () => `Expected ranking to be set`;
    } else {
      if (!actual.hasOwnProperty('ranking')) {
        result.pass = false;
        result.message = () =>
          `Expected ranking of ${expected} instead got no ranking`;
      } else {
        result.pass = actual.ranking === expected;
        result.message = () =>
          `Expected ranking of ${expected} instead got ${actual.ranking}`;
      }
    }

    return result;
  },
});

declare module 'expect' {
  interface Matchers<R> {
    toHaveRanking(expected?: number): R;
  }
}

function createResult(personId: number, plain: number[]): Result {
  let r: Result = {
    personId: personId,
    attempts: [],
    best: 0,
    average: 0,
    ranking: null,
  };
  plain.forEach((p) =>
    r.attempts.push({
      result: p,
      reconstruction: null,
    })
  );
  return r;
}

describe('Ranking Helper', function () {
  describe('Average only', function () {
    describe('Ao5', function () {
      it('ranks 2 people with the same average the same', function () {
        let results: Result[] = [
          createResult(1, [1, 3, 5, 7, 9]),
          createResult(2, [3, 4, 5, 6, 7]),
        ];
        let rankedResults = rank(results, ['average']);
        expect(rankedResults[0]).toHaveRanking(1);
        expect(rankedResults[1]).toHaveRanking(1);
      });

      it('ranks 2 people with a different average differently', function () {
        let results: Result[] = [
          createResult(1, [1, 3, 5, 7, 9]),
          createResult(2, [4, 5, 6, 7, 8]),
        ];
        let rankedResults = rank(results, ['average']);
        expect(rankedResults[0]).toHaveRanking(1);
        expect(rankedResults[0].personId).toBe(1);
        expect(rankedResults[1]).toHaveRanking(2);
        expect(rankedResults[1].personId).toBe(2);
      });

      it('ranks 2 people with the same average the same when not in first position', function () {
        let results: Result[] = [
          createResult(1, [1, 3, 5, 7, 9]),
          createResult(2, [3, 4, 5, 6, 7]),
          createResult(99, [1, 1, 1, 1, 1]),
        ];
        let rankedResults = rank(results, ['average']);
        expect(rankedResults[0]).toHaveRanking(1);
        expect(rankedResults[0].personId).toBe(99);
        expect(rankedResults[1]).toHaveRanking(2);
        expect(rankedResults[2]).toHaveRanking(2);
      });

      it('ranks 2 people with a different average differently when not in first position', function () {
        let results: Result[] = [
          createResult(1, [1, 3, 5, 7, 9]),
          createResult(2, [4, 5, 6, 7, 8]),
          createResult(99, [1, 1, 1, 1, 1]),
        ];
        let rankedResults = rank(results, ['average']);
        expect(rankedResults[0]).toHaveRanking(1);
        expect(rankedResults[0].personId).toBe(99);
        expect(rankedResults[1]).toHaveRanking(2);
        expect(rankedResults[1].personId).toBe(1);
        expect(rankedResults[2]).toHaveRanking(3);
        expect(rankedResults[2].personId).toBe(2);
      });
    });

    describe('Mo3', function () {
      it('ranks 2 people with the same average the same', function () {
        let results: Result[] = [
          createResult(1, [3, 5, 7]),
          createResult(2, [4, 5, 6]),
        ];
        let rankedResults = rank(results, ['average']);
        expect(rankedResults[0]).toHaveRanking(1);
        expect(rankedResults[1]).toHaveRanking(1);
      });

      it('ranks 2 people with a different average differently', function () {
        let results: Result[] = [
          createResult(1, [3, 5, 7]),
          createResult(2, [5, 6, 7]),
        ];
        let rankedResults = rank(results, ['average']);
        expect(rankedResults[0]).toHaveRanking(1);
        expect(rankedResults[0].personId).toBe(1);
        expect(rankedResults[1]).toHaveRanking(2);
        expect(rankedResults[1].personId).toBe(2);
      });

      it('ranks 2 people with the same average the same when not in first position', function () {
        let results: Result[] = [
          createResult(1, [3, 5, 7]),
          createResult(2, [4, 5, 6]),
          createResult(99, [1, 1, 1]),
        ];
        let rankedResults = rank(results, ['average']);
        expect(rankedResults[0]).toHaveRanking(1);
        expect(rankedResults[0].personId).toBe(99);
        expect(rankedResults[1]).toHaveRanking(2);
        expect(rankedResults[2]).toHaveRanking(2);
      });

      it('ranks 2 people with a different average differently when not in first position', function () {
        let results: Result[] = [
          createResult(1, [3, 5, 7]),
          createResult(2, [5, 6, 7]),
          createResult(99, [1, 1, 1]),
        ];
        let rankedResults = rank(results, ['average']);
        expect(rankedResults[0]).toHaveRanking(1);
        expect(rankedResults[0].personId).toBe(99);
        expect(rankedResults[1]).toHaveRanking(2);
        expect(rankedResults[1].personId).toBe(1);
        expect(rankedResults[2]).toHaveRanking(3);
        expect(rankedResults[2].personId).toBe(2);
      });
    });
  });

  describe('Single only', function () {
    it('ranks 2 people with the same best the same', function () {
      let results: Result[] = [
        createResult(1, [1, 3, 5]),
        createResult(2, [3, 2, 1]),
      ];
      let rankedResults = rank(results, ['single']);
      expect(rankedResults[0]).toHaveRanking(1);
      expect(rankedResults[1]).toHaveRanking(1);
    });

    it('ranks 2 people with different bests differently', function () {
      let results: Result[] = [
        createResult(1, [2, 3, 5]),
        createResult(2, [3, 2, 1]),
      ];
      let rankedResults = rank(results, ['single']);
      expect(rankedResults[0]).toHaveRanking(1);
      expect(rankedResults[0].personId).toBe(2);
      expect(rankedResults[1]).toHaveRanking(2);
      expect(rankedResults[1].personId).toBe(1);
    });

    it('ranks 2 people with the same best the same when not in first position', function () {
      let results: Result[] = [
        createResult(1, [2, 3, 5]),
        createResult(2, [3, 2, 2]),
        createResult(99, [1, 1, 1]),
      ];
      let rankedResults = rank(results, ['single']);
      expect(rankedResults[0]).toHaveRanking(1);
      expect(rankedResults[0].personId).toBe(99);
      expect(rankedResults[1]).toHaveRanking(2);
      expect(rankedResults[2]).toHaveRanking(2);
    });

    it('ranks 2 people with different bests differently when not in first position', function () {
      let results: Result[] = [
        createResult(1, [3, 3, 5]),
        createResult(2, [3, 2, 2]),
        createResult(99, [1, 1, 1]),
      ];
      let rankedResults = rank(results, ['single']);
      expect(rankedResults[0]).toHaveRanking(1);
      expect(rankedResults[0].personId).toBe(99);
      expect(rankedResults[1]).toHaveRanking(2);
      expect(rankedResults[1].personId).toBe(2);
      expect(rankedResults[2]).toHaveRanking(3);
      expect(rankedResults[2].personId).toBe(1);
    });
  });

  describe('Average, then single', function () {
    it('ranks 2 people with the same average and the same best the same', function () {
      let results: Result[] = [
        createResult(1, [1, 3, 5, 7, 9]),
        createResult(2, [1, 4, 5, 6, 7]),
      ];
      let rankedResults = rank(results, ['average', 'single']);
      expect(rankedResults[0]).toHaveRanking(1);
      expect(rankedResults[1]).toHaveRanking(1);
    });

    it('ranks 2 people with a different average differently', function () {
      let results: Result[] = [
        createResult(1, [1, 3, 5, 7, 9]),
        createResult(2, [4, 5, 6, 7, 8]),
      ];
      let rankedResults = rank(results, ['average']);
      expect(rankedResults[0]).toHaveRanking(1);
      expect(rankedResults[0].personId).toBe(1);
      expect(rankedResults[1]).toHaveRanking(2);
      expect(rankedResults[1].personId).toBe(2);
    });

    it('ranks 2 people with a different average but the same best differently', function () {
      let results: Result[] = [
        createResult(1, [1, 3, 5, 7, 9]),
        createResult(2, [1, 5, 6, 7, 8]),
      ];
      let rankedResults = rank(results, ['average']);
      expect(rankedResults[0]).toHaveRanking(1);
      expect(rankedResults[0].personId).toBe(1);
      expect(rankedResults[1]).toHaveRanking(2);
      expect(rankedResults[1].personId).toBe(2);
    });

    it('ranks 2 people with the same average but different best differently', function () {
      let results: Result[] = [
        createResult(1, [2, 3, 5, 7, 9]),
        createResult(2, [1, 4, 5, 6, 7]),
      ];
      let rankedResults = rank(results, ['average', 'single']);
      expect(rankedResults[0]).toHaveRanking(1);
      expect(rankedResults[0].personId).toBe(2);
      expect(rankedResults[1]).toHaveRanking(2);
      expect(rankedResults[1].personId).toBe(1);
    });

    it('ranks a full result correctly', function () {
      let results: Result[] = [
        createResult(1, [500, 600, 700, 800, 900]), // AVG: 700, B: 500, R: 6=
        createResult(2, [400, 600, 700, 800, 900]), // AVG: 700, B: 400, R: 4=
        createResult(3, [400, 500, 600, 700, 800]), // AVG: 600, B: 400, R: 2
        createResult(4, [600, 700, 800, 900, 1000]), // AVG: 800, B: 600: R: 10=
        createResult(5, [550, 650, 750, 850, 950]), // AVG: 750, B: 550, R: 9
        createResult(6, [450, 550, 650, 750, 850]), // AVG: 650, B: 450, R: 3
        createResult(7, [600, 600, 700, 800, 800]), // AVG: 700, B: 600, R: 8
        createResult(8, [500, 600, 700, -1, -1]), // AVG: -1, B: 500, R: 12
        createResult(9, [-1, -1, 700, 800, 900]), // AVG: -1, B: 700, R: 13
        createResult(10, [-1, 600, 700, 800, 900]), // AVG: 800, B: 600, R: 10=
        createResult(11, [510, 520, 530, 540, 550]), // AVG: 530, B: 510, R: 1
        createResult(12, [500, 600, 700, 800, 900]), // AVG: 700, B: 500, R: 6=
        createResult(13, [400, 600, 700, 800, 900]), // AVG: 700, B: 400, R: 4=
        createResult(14, [2000, 4000]), // AVG: null, B: 2000, R: 14 (didn't make cutoff)
        createResult(15, [-1, -1]), // AVG: null, B: DNF, R: 15 (didn't make cutoff)
      ];

      let rankedResults = rank(results, ['average', 'single']);

      expect(rankedResults[0].personId).toBe(11);
      expect(rankedResults[0]).toHaveRanking(1);

      expect(rankedResults[1].personId).toBe(3);
      expect(rankedResults[1]).toHaveRanking(2);

      expect(rankedResults[2].personId).toBe(6);
      expect(rankedResults[2]).toHaveRanking(3);

      expect(rankedResults[3].personId).toBe(2);
      expect(rankedResults[3]).toHaveRanking(4);

      expect(rankedResults[4].personId).toBe(13);
      expect(rankedResults[4]).toHaveRanking(4);

      expect(rankedResults[5].personId).toBe(1);
      expect(rankedResults[5]).toHaveRanking(6);

      expect(rankedResults[6].personId).toBe(12);
      expect(rankedResults[6]).toHaveRanking(6);

      expect(rankedResults[7].personId).toBe(7);
      expect(rankedResults[7]).toHaveRanking(8);

      expect(rankedResults[8].personId).toBe(5);
      expect(rankedResults[8]).toHaveRanking(9);

      expect(rankedResults[9].personId).toBe(4);
      expect(rankedResults[9]).toHaveRanking(10);

      expect(rankedResults[10].personId).toBe(10);
      expect(rankedResults[10]).toHaveRanking(10);

      expect(rankedResults[11].personId).toBe(8);
      expect(rankedResults[11]).toHaveRanking(12);

      expect(rankedResults[12].personId).toBe(9);
      expect(rankedResults[12]).toHaveRanking(13);

      expect(rankedResults[13].personId).toBe(14);
      expect(rankedResults[13]).toHaveRanking(14);

      expect(rankedResults[14].personId).toBe(15);
      expect(rankedResults[14]).toHaveRanking(15);
    });
  });
});
