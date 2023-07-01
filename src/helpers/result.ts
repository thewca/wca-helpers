import { AttemptResult } from '../models/attemptResult';
import { formatCentiseconds } from './time';

type DnfMultiResult = { isDnf: true };
type DnsMultiResult = { isDns: true };
type ValidMultiResult = {
  attempted: number;
  solved: number;
  centiseconds?: number;
};

type DecodedMultiResult = DnfMultiResult | DnsMultiResult | ValidMultiResult;

export function isDnf(result: AttemptResult): boolean {
  return result === -1;
}

export function isDns(result: AttemptResult): boolean {
  return result === -2;
}

export function isMultiResult(result: AttemptResult): boolean {
  // Formatted as a base 10 string, a multi result will always have 8 or 9 digits.
  // New style mbld has an implied 0 at the beginning which is not included in the length
  return [9, 10].indexOf(result.toString().length) > -1;
}

export function decodeMultiResult(result: AttemptResult): DecodedMultiResult {
  let r = result;
  if (r === -1) {
    return { isDnf: true };
  }
  if (r === -2) {
    return { isDns: true };
  }
  return r.toString().length === 10
    ? decodeOldMultiResult(result)
    : decodeNewMultiResult(result);
}

/**
 * Encodes new style multiblind result
 */
export function encodeMultiResult(result: DecodedMultiResult): number {
  if (isDnfMultiResult(result)) return -1;
  if (isDnsMultiResult(result)) return -2;
  if (isMultiResultDnf(result)) return -1;

  let missed = result.attempted - result.solved;
  let dd = 99 - (result.solved - missed);
  let tt = Math.round((result.centiseconds || 9999900) / 100); // multi results are always rounded to seconds, 99999 is used for 'unknown'

  return dd * 10000000 + tt * 100 + missed;
}

export function isMultiResultDnf(result: DecodedMultiResult): boolean {
  if (isDnfMultiResult(result)) return true;
  if (isDnsMultiResult(result)) return true;
  if (result.solved < 2) return true;
  let solved = result.solved;
  let notSolved = result.attempted - solved;
  if (solved - notSolved < 0) return true;
  return false;
}

export function formatMultiResult(result: DecodedMultiResult): string {
  if (isDnfMultiResult(result)) return 'DNF';
  if (isDnsMultiResult(result)) return 'DNS';
  if (isMultiResultDnf(result)) return 'DNF';

  let formatted = `${result.solved}/${result.attempted}`;
  if (result.centiseconds && result.centiseconds !== 9999900) {
    let fcs = formatCentiseconds(result.centiseconds);
    formatted += ` ${fcs.substring(0, fcs.length - 3)}`; // chop off the decimal part
  }
  return formatted;
}

function isDnfMultiResult(
  result: DecodedMultiResult
): result is DnfMultiResult {
  return result.hasOwnProperty('isDnf');
}

function isDnsMultiResult(
  result: DecodedMultiResult
): result is DnsMultiResult {
  return result.hasOwnProperty('isDns');
}

function decodeOldMultiResult(result: AttemptResult): DecodedMultiResult {
  // Handles DNF and DNS
  if (result <= 0) return { solved: 0, attempted: 0, centiseconds: result };

  const seconds = result % 1e5;
  const AA = Math.floor(result / 1e5) % 100;
  const SS = Math.floor(result / 1e7) % 100;
  const solved = 99 - SS;
  const res: DecodedMultiResult = { solved, attempted: AA };
  if (seconds < 99999) {
    res.centiseconds = seconds * 100;
  }

  return res;
}

function decodeNewMultiResult(result: AttemptResult): DecodedMultiResult {
  // Handles DNF and DNS
  if (result <= 0) return { solved: 0, attempted: 0, centiseconds: result };

  const missed = result % 100;
  const seconds = Math.floor(result / 100) % 1e5;
  const points = 99 - (Math.floor(result / 1e7) % 100);
  const solved = points + missed;
  const attempted = solved + missed;
  const res: DecodedMultiResult = { solved, attempted };
  if (seconds < 99999) {
    res.centiseconds = seconds * 100;
  }

  return res;
}
