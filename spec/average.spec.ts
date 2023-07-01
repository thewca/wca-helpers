import { Ao5, Mo3 } from '../src/helpers/average';

describe('Average Helper', function () {
  describe('Ao5', function () {
    it('Returns null when not all attempts have been completed', function () {
      let incompleteAttempts = [1000, 1000, 1000, 1000];
      expect(Ao5(incompleteAttempts)).toBeNull();
    });

    it('Excludes results that are 0', function () {
      let incompleteAttempts = [1000, 1000, 0, 0, 0];
      expect(Ao5(incompleteAttempts)).toBeNull();
    });

    it('Returns null when encountering MBLD results', function () {
      let attempts = [1000, 1000, 1000, 1000, 800360000];
      expect(Ao5(attempts)).toBeNull();
    });

    it('Returns -1 when more than 1 DNF', function () {
      let attempts = [1000, 1000, 1000, -1, -1];
      expect(Ao5(attempts)).toBe(-1);
    });

    it('Returns -1 when more than 1 DNS', function () {
      let attempts = [1000, 1000, 1000, -2, -2];
      expect(Ao5(attempts)).toBe(-1);
    });

    it('Returns -1 when more than 1 DNF and DNS', function () {
      let attempts = [1000, 1000, 1000, -1, -2];
      expect(Ao5(attempts)).toBe(-1);
    });

    it('Returns correct average', function () {
      let attempts = [1000, 2000, 3000, 4000, 5000];
      expect(Ao5(attempts)).toBe(3000);
      attempts = [3000, 4000, 5000, 1000, 2000]; // same values, different order, should give same average
      expect(Ao5(attempts)).toBe(3000);
    });

    it('Rounds averages correctly', function () {
      let attempts = [10, 11, 31, 21, 20]; // 11 + 21 + 20 = 52 => avg = 17.33333333
      expect(Ao5(attempts)).toBe(17);
      attempts = [10, 11, 31, 22, 20]; // 11 + 22 + 20 = 53 => avg = 17.6666666
      expect(Ao5(attempts)).toBe(18);
    });

    it('Returns correct average when a DNF is involved', function () {
      let attempts = [1000, 2000, 3000, 4000, -1];
      expect(Ao5(attempts)).toBe(3000);
      attempts = [3000, 4000, -1, 1000, 2000]; // same values, different order, should give same average
      expect(Ao5(attempts)).toBe(3000);
    });

    it('Returns correct average when a DNS is involved', function () {
      let attempts = [1000, 2000, 3000, 4000, -2];
      expect(Ao5(attempts)).toBe(3000);
      attempts = [3000, 4000, -2, 1000, 2000]; // same values, different order, should give same average
      expect(Ao5(attempts)).toBe(3000);
    });

    it('Rounds average correctly when > 10 minutes', function () {
      let attempts = [60000, 66100, 72000, 78000, 84000];
      expect(Ao5(attempts)).toBe(72000);
      attempts = [60000, 66200, 72000, 78000, 84000];
      expect(Ao5(attempts)).toBe(72100);
    });
  });

  describe('Mo3', function () {
    it('Returns null when not all attempts have been completed', function () {
      let incompleteAttempts = [1000, 1000];
      expect(Mo3(incompleteAttempts)).toBeNull();
    });

    it('Excludes results that are 0', function () {
      let incompleteAttempts = [1000, 1000, 0];
      expect(Mo3(incompleteAttempts)).toBeNull();
    });

    it('Returns null when encountering MBLD results', function () {
      let attempts = [1000, 1000, 800360000];
      expect(Mo3(attempts)).toBeNull();
    });

    it('Returns -1 when more than 0 DNF', function () {
      let attempts = [1000, 1000, -1];
      expect(Mo3(attempts)).toBe(-1);
    });

    it('Returns -1 when more than 0 DNS', function () {
      let attempts = [1000, 1000, -2];
      expect(Mo3(attempts)).toBe(-1);
    });

    it('Returns correct mean', function () {
      let attempts = [1000, 2000, 3000];
      expect(Mo3(attempts)).toBe(2000);
      attempts = [3000, 1000, 2000]; // same values, different order, should give same average
      expect(Mo3(attempts)).toBe(2000);
    });

    it('Rounds mean correctly', function () {
      let attempts = [11, 21, 20]; // 11 + 21 + 20 = 52 => avg = 17.33333333
      expect(Mo3(attempts)).toBe(17);
      attempts = [11, 22, 20]; // 11 + 22 + 20 = 53 => avg = 17.6666666
      expect(Mo3(attempts)).toBe(18);
    });

    it('Rounds mean correctly when > 10 minutes', function () {
      let attempts = [66100, 72000, 78000];
      expect(Mo3(attempts)).toBe(72000);
      attempts = [66200, 72000, 78000];
      expect(Mo3(attempts)).toBe(72100);
    });
  });
});
