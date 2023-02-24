import { formatCentiseconds } from '../src/helpers/time';

describe('Time Helper', function () {
  it('Correctly formats DNF', function () {
    expect(formatCentiseconds(-1)).toBe('DNF');
  });

  it('Correctly formats DNS', function () {
    expect(formatCentiseconds(-2)).toBe('DNS');
  });

  it('Correctly formats times under 1 second', function () {
    expect(formatCentiseconds(79)).toBe('0.79');
  });

  it('Correctly formats times of exactly X seconds', function () {
    expect(formatCentiseconds(100)).toBe('1.00');
    expect(formatCentiseconds(200)).toBe('2.00');
    expect(formatCentiseconds(1000)).toBe('10.00');
  });

  it('Correctly formats times of X seconds and Y centiseconds', function () {
    expect(formatCentiseconds(101)).toBe('1.01');
    expect(formatCentiseconds(202)).toBe('2.02');
    expect(formatCentiseconds(1010)).toBe('10.10');
  });

  it('Correctly formats times of exactly X minutes', function () {
    expect(formatCentiseconds(6000)).toBe('1:00.00');
    expect(formatCentiseconds(12000)).toBe('2:00.00');
    expect(formatCentiseconds(60000)).toBe('10:00.00');
  });

  it('Correctly formats times with X minutes and Y centiseconds', function () {
    expect(formatCentiseconds(6001)).toBe('1:00.01');
    expect(formatCentiseconds(12002)).toBe('2:00.02');
    expect(formatCentiseconds(60010)).toBe('10:00.10');
  });

  it('Correctly formats times with X minutes and Y seconds', function () {
    expect(formatCentiseconds(6100)).toBe('1:01.00');
    expect(formatCentiseconds(12200)).toBe('2:02.00');
    expect(formatCentiseconds(61000)).toBe('10:10.00');
  });

  it('Correctly formats times with X minutes, Y seconds and Z centiseconds', function () {
    expect(formatCentiseconds(6101)).toBe('1:01.01');
    expect(formatCentiseconds(12202)).toBe('2:02.02');
  });

  it('Correctly formats times > 1 hour as in minutes', function () {
    expect(formatCentiseconds(360000)).toBe('60:00.00');
    expect(formatCentiseconds(360400)).toBe('60:04.00');
  });
});
