import {
  getFormatExpectedSolves,
  getFormatName,
  getFormatRanking,
  getFormatTrimBest,
  getFormatTrimWorst,
} from '../src/helpers/format';

describe('Format helper', function () {
  it('returns the Head-to-Head format properties', function () {
    expect(getFormatName('h')).toBe('Head-to-Head');
    expect(getFormatRanking('h')).toEqual(['single']);
    expect(getFormatExpectedSolves('h')).toBe(0);
    expect(getFormatTrimBest('h')).toBe(0);
    expect(getFormatTrimWorst('h')).toBe(0);
  });
});
