import { AttemptResult } from "../models/attemptResult";
import { formatCentiseconds } from './time';

type DnfMultiResult = { isDnf: true };
type DnsMultiResult = { isDns: true };
type ValidMultiResult = { attempted: number, solved: number, centiseconds?: number };

type DecodedMultiResult = DnfMultiResult | DnsMultiResult | ValidMultiResult;

export function isDnf(result: AttemptResult): boolean {
  return `${result}` === '-1';
}

export function isDns(result: AttemptResult): boolean {
  return `${result}` === '-2';
}

export function isMultiResult(result: AttemptResult): boolean {
  return /^(0|1)\d{9}/.test(`${result}`);
  // this is a save check, as the lowest MBLD formatted result would be 0010000000.
  // this equates to 100000 seconds, which is nearly 28 hours
}

export function decodeMultiResult(result: AttemptResult): DecodedMultiResult {
  let r = `${result}`;
  if (r === '-1') {
    return { isDnf: true };
  }
  if (r === '-2') {
    return { isDns: true };
  }
  return r[0] === '1' ? decodeOldMultiResult(result) : decodeNewMultiResult(result);
}

export function encodeMultiResult(result: DecodedMultiResult): string {
  if (isDnfMultiResult(result)) return '-1';
  if (isDnsMultiResult(result)) return '-2';
  if (isMultiResultDnf(result)) return '-1';

  let missed = result.attempted - result.solved;
  let dd = '' + (99 - (result.solved - missed));
  let tt = '' + Math.round((result.centiseconds || 9999900) / 100); // multi results are always rounded to seconds, 99999 is used for 'unknown'
  let mm = '' + missed;

  return `0${padZero(dd, 2)}${padZero(tt, 5)}${padZero(mm, 2)}`;
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
    formatted += ` ${ fcs.substring(0, fcs.length - 3) }`; // chop off the decimal part
  }
  return formatted;
}

function isDnfMultiResult(result: DecodedMultiResult): result is DnfMultiResult {
  return result.hasOwnProperty('isDnf');
}

function isDnsMultiResult(result: DecodedMultiResult): result is DnsMultiResult {
  return result.hasOwnProperty('isDns');
}

function decodeOldMultiResult(result: AttemptResult): DecodedMultiResult {
  let r = `${result}`;
  let ss = parseInt(r.substr(1, 2), 10);
  let aa = parseInt(r.substr(3, 2), 10);
  let tt = parseInt(r.substr(5, 5), 10);

  let res: ValidMultiResult = { attempted: aa, solved: 99 - ss };
  if (tt !== 99999) {
    res.centiseconds = tt * 100;
  }
  return res;
}

function decodeNewMultiResult(result: AttemptResult): DecodedMultiResult {
  let r = `${result}`;
  let dd = parseInt(r.substr(1, 2), 10);
  let tt = parseInt(r.substr(3, 5), 10);
  let mm = parseInt(r.substr(8, 2), 10);
  let difference = 99 - dd;
  let solved = difference + mm;
  let attempted = solved + mm;

  let res: ValidMultiResult = { attempted: attempted, solved: solved };
  if (tt !== 99999) {
    res.centiseconds = tt * 100;
  }
  return res;
}

function padZero(str: string, length: number): string {
  let s = str;
  for (let i = 0; i < length; i++) {
    s = '0' + s;
  }
  return s.substr(-1 * length, length);
}