/// <reference path="support/custom-matcher-types.d.ts" />

import { Result } from '../src/models/result';
import { rank } from '../src/helpers/ranking';

import CustomMatcherFactories = jasmine.CustomMatcherFactories;
import CustomMatcherResult = jasmine.CustomMatcherResult;

let customMatchers: CustomMatcherFactories = {
  toHaveRanking: function(util, customEqTesters) {
    return {
      compare: function(actual: Result, expected: number) {
        var result: CustomMatcherResult = {
          pass: false
        };
        if (expected === undefined) {
          result.pass = actual.hasOwnProperty('ranking') && actual.ranking! > 0;
        } else {
          if (!actual.hasOwnProperty('ranking')) {
            result.pass = false;
          } else {
            result.pass = util.equals(actual.ranking, expected, customEqTesters);
          }
        }
        return result;
      }
    };
  }
};

function createResult(personId: number, plain: number[]): Result {
  let r: Result = { personId: personId, attempts: [] };
  plain.forEach(p => r.attempts.push({ result: p }));
  return r;
}

describe('Ranking Helper', function() {

  describe('Average only', function() {

    describe('Ao5', function() {
      beforeEach(function() {
        jasmine.addMatchers(customMatchers);
      });
  
      it('ranks 2 people with the same average the same', function() {
        let results: Result[] = [
          createResult(1, [1, 3, 5, 7, 9]),
          createResult(2, [3, 4, 5, 6, 7])
        ];
        let rankedResults = rank(results, ['average']);
        expect(rankedResults[0]).toHaveRanking(1);
        expect(rankedResults[1]).toHaveRanking(1);
      });
  
      it('ranks 2 people with a different average differently', function() {
        let results: Result[] = [
          createResult(1, [1, 3, 5, 7, 9]),
          createResult(2, [4, 5, 6, 7, 8])
        ];
        let rankedResults = rank(results, ['average']);
        expect(rankedResults[0]).toHaveRanking(1);
        expect(rankedResults[0].personId).toBe(1);
        expect(rankedResults[1]).toHaveRanking(2);
        expect(rankedResults[1].personId).toBe(2);
      });
  
      it('ranks 2 people with the same average the same when not in first position', function() {
        let results: Result[] = [
          createResult(1, [1, 3, 5, 7, 9]),
          createResult(2, [3, 4, 5, 6, 7]),
          createResult(99, [1, 1, 1, 1, 1])
        ];
        let rankedResults = rank(results, ['average']);
        expect(rankedResults[0]).toHaveRanking(1);
        expect(rankedResults[0].personId).toBe(99);
        expect(rankedResults[1]).toHaveRanking(2);
        expect(rankedResults[2]).toHaveRanking(2);
      });
  
      it('ranks 2 people with a different average differently when not in first position', function() {
        let results: Result[] = [
          createResult(1, [1, 3, 5, 7, 9]),
          createResult(2, [4, 5, 6, 7, 8]),
          createResult(99, [1, 1, 1, 1, 1])
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

    describe('Mo3', function() {
      beforeEach(function() {
        jasmine.addMatchers(customMatchers);
      });
  
      it('ranks 2 people with the same average the same', function() {
        let results: Result[] = [
          createResult(1, [ 3, 5, 7]),
          createResult(2, [ 4, 5, 6])
        ];
        let rankedResults = rank(results, ['average']);
        expect(rankedResults[0]).toHaveRanking(1);
        expect(rankedResults[1]).toHaveRanking(1);
      });
  
      it('ranks 2 people with a different average differently', function() {
        let results: Result[] = [
          createResult(1, [ 3, 5, 7 ]),
          createResult(2, [ 5, 6, 7 ])
        ];
        let rankedResults = rank(results, ['average']);
        expect(rankedResults[0]).toHaveRanking(1);
        expect(rankedResults[0].personId).toBe(1);
        expect(rankedResults[1]).toHaveRanking(2);
        expect(rankedResults[1].personId).toBe(2);
      });
  
      it('ranks 2 people with the same average the same when not in first position', function() {
        let results: Result[] = [
          createResult(1, [3, 5, 7]),
          createResult(2, [4, 5, 6]),
          createResult(99, [1, 1, 1])
        ];
        let rankedResults = rank(results, ['average']);
        expect(rankedResults[0]).toHaveRanking(1);
        expect(rankedResults[0].personId).toBe(99);
        expect(rankedResults[1]).toHaveRanking(2);
        expect(rankedResults[2]).toHaveRanking(2);
      });
  
      it('ranks 2 people with a different average differently when not in first position', function() {
        let results: Result[] = [
          createResult(1, [3, 5, 7]),
          createResult(2, [5, 6, 7]),
          createResult(99, [1, 1, 1])
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

  describe('Single only', function() {

    beforeEach(function() {
      jasmine.addMatchers(customMatchers);
    });

    it('ranks 2 people with the same best the same', function() {
      let results: Result[] = [
        createResult(1, [1, 3, 5]),
        createResult(2, [3, 2, 1])
      ];
      let rankedResults = rank(results, ['single']);
      expect(rankedResults[0]).toHaveRanking(1);
      expect(rankedResults[1]).toHaveRanking(1);
    });

    it('ranks 2 people with different bests differently', function() {
      let results: Result[] = [
        createResult(1, [2, 3, 5]),
        createResult(2, [3, 2, 1])
      ];
      let rankedResults = rank(results, ['single']);
      expect(rankedResults[0]).toHaveRanking(1);
      expect(rankedResults[0].personId).toBe(2);
      expect(rankedResults[1]).toHaveRanking(2);
      expect(rankedResults[1].personId).toBe(1);
    });

    it('ranks 2 people with the same best the same when not in first position', function() {
      let results: Result[] = [
        createResult(1, [2, 3, 5]),
        createResult(2, [3, 2, 2]),
        createResult(99, [1, 1, 1])
      ];
      let rankedResults = rank(results, ['single']);
      expect(rankedResults[0]).toHaveRanking(1);
      expect(rankedResults[0].personId).toBe(99);
      expect(rankedResults[1]).toHaveRanking(2);
      expect(rankedResults[2]).toHaveRanking(2);
    });

    it('ranks 2 people with different bests differently when not in first position', function() {
      let results: Result[] = [
        createResult(1, [3, 3, 5]),
        createResult(2, [3, 2, 2]),
        createResult(99, [1, 1, 1])
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

  describe('Average, then single', function() {

    beforeEach(function() {
      jasmine.addMatchers(customMatchers);
    });

    it('ranks 2 people with the same average and the same best the same', function() {
      let results: Result[] = [
        createResult(1, [1, 3, 5, 7, 9]),
        createResult(2, [1, 4, 5, 6, 7])
      ];
      let rankedResults = rank(results, ['average', 'single']);
      expect(rankedResults[0]).toHaveRanking(1);
      expect(rankedResults[1]).toHaveRanking(1);
    });

    it('ranks 2 people with a different average differently', function() {
      let results: Result[] = [
        createResult(1, [1, 3, 5, 7, 9]),
        createResult(2, [4, 5, 6, 7, 8])
      ];
      let rankedResults = rank(results, ['average']);
      expect(rankedResults[0]).toHaveRanking(1);
      expect(rankedResults[0].personId).toBe(1);
      expect(rankedResults[1]).toHaveRanking(2);
      expect(rankedResults[1].personId).toBe(2);
    });

    it('ranks 2 people with a different average but the same best differently', function() {
      let results: Result[] = [
        createResult(1, [1, 3, 5, 7, 9]),
        createResult(2, [1, 5, 6, 7, 8])
      ];
      let rankedResults = rank(results, ['average']);
      expect(rankedResults[0]).toHaveRanking(1);
      expect(rankedResults[0].personId).toBe(1);
      expect(rankedResults[1]).toHaveRanking(2);
      expect(rankedResults[1].personId).toBe(2);
    });

    it('ranks 2 people with the same average but different best differently', function() {
      let results: Result[] = [
        createResult(1, [2, 3, 5, 7, 9]),
        createResult(2, [1, 4, 5, 6, 7])
      ];
      let rankedResults = rank(results, ['average', 'single']);
      expect(rankedResults[0]).toHaveRanking(1);
      expect(rankedResults[0].personId).toBe(2);
      expect(rankedResults[1]).toHaveRanking(2);
      expect(rankedResults[1].personId).toBe(1);
    });

  });
});