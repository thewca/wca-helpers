import { isDnf, isDns, isMultiResult, decodeMultiResult, isMultiResultDnf, encodeMultiResult, formatMultiResult } from '../src/helpers/result';

describe("Result helper", function() {
  it("Returns true when checking a DNF for being a DNF", function() {
    expect(isDnf(-1)).toBeTruthy();
  });

  it("Returns false when checking a non-DNF for being a DNF", function() {
    expect(isDnf(-2)).toBeFalsy();
    expect(isDnf(0)).toBeFalsy();
    expect(isDnf(123)).toBeFalsy();
  });

  it("Returns true when checking a DNS for being a DNS", function() {
    expect(isDns(-2)).toBeTruthy();
  });

  it("Returns false when checking a non-DNS for being a DNS", function() {
    expect(isDns(-1)).toBeFalsy();
    expect(isDns(0)).toBeFalsy();
    expect(isDns(123)).toBeFalsy();
  });

  it("Correctly identifies old style MBLD result", function() {
    expect(isMultiResult(1980302580)).toBeTruthy();
  });

  it("Correctly identifies new style MBLD result", function() {
    expect(isMultiResult('0970360002')).toBeTruthy();
  });

  it("Correctly identifies non MBLD results", function() {
    expect(isMultiResult(-1)).toBeFalsy();
    expect(isMultiResult(-2)).toBeFalsy();
    expect(isMultiResult(0)).toBeFalsy();
    expect(isMultiResult(123)).toBeFalsy();
    expect(isMultiResult(59353)).toBeFalsy();
  });

  it("Correctly decodes DNF multi result", function() {
    expect(decodeMultiResult(-1)).toEqual({ isDnf: true });
  });

  it("Correctly decodes DNS multi result", function() {
    expect(decodeMultiResult(-2)).toEqual({ isDns: true });
  });

  it("Correctly decodes old style multi result", function() {
    expect(decodeMultiResult(1980302580)).toEqual({
      solved: 1,
      attempted: 3,
      centiseconds: 258000
    });
  });

  it("Correctly decodes new style multi result", function() {
    expect(decodeMultiResult('0970360002')).toEqual({
      solved: 4,
      attempted: 6,
      centiseconds: 360000
    });
  });

  it("Correctly identifies if MBLD result should be a DNF", function() {
    expect(isMultiResultDnf({ solved: 1, attempted: 2, centiseconds: 10000 })).toBeTruthy();
    expect(isMultiResultDnf({ solved: 2, attempted: 5, centiseconds: 10000 })).toBeTruthy();
    expect(isMultiResultDnf({ solved: 3, attempted: 5, centiseconds: 10000 })).toBeFalsy();
  });

  it("Correctly encodes a MBLD result", function() {
    expect(encodeMultiResult({
      solved: 4,
      attempted: 6,
      centiseconds: 360000
    })).toEqual('0970360002');
  });

  it("Correctly encodes MBLD result as DNF", function() {
    expect(encodeMultiResult({ isDnf: true })).toEqual('-1');
    expect(encodeMultiResult({ solved: 1, attempted: 2, centiseconds: 10000 })).toEqual('-1');
    expect(encodeMultiResult({ solved: 2, attempted: 5, centiseconds: 10000 })).toEqual('-1');
  });

  it("Correctly formats a MBLD result", function() {
    expect(formatMultiResult({ solved: 3, attempted: 5, centiseconds: 10000 })).toEqual('3/5 1:40');
    expect(formatMultiResult({ solved: 3, attempted: 5, centiseconds: 10001 })).toEqual('3/5 1:40');
    expect(formatMultiResult({ solved: 25, attempted: 25, centiseconds: 360000 })).toEqual('25/25 60:00');
  });
});