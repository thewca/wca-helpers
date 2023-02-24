import { AttemptResult } from '../models/attemptResult';
import { isMultiResult } from './result';

export function Ao5(results: AttemptResult[]): AttemptResult | null {
  results = results.filter((r) => r !== 0);

  if (results.some(isMultiResult)) return null; // cannot calculate average or mean for MBLD

  if (results.length !== 5) return null;

  if (results.filter((r) => r < 0).length > 1) {
    // can have at most 1 DNF or DNS for Ao5
    return -1;
  }

  let comparableResults = results.map((result) => {
    let r = parseInt(`${result}`, 10);
    if (r === -1) return Number.MAX_VALUE - 2; // normalize DNS and DNF to high numbers, so we can treat them as normal results, while
    if (r === -2) return Number.MAX_VALUE - 1; // keeping DNF better than DNS
    return r;
  });

  let best = Math.min(...comparableResults);
  let worst = Math.max(...comparableResults);

  delete comparableResults[comparableResults.indexOf(best)];
  delete comparableResults[comparableResults.indexOf(worst)];

  let avg = Math.round(
    (comparableResults.reduce(
      (a, b) => parseInt(`${a}`, 10) + parseInt(`${b}`, 10),
      0
    ) as number) / 3
  );
  if (avg > 60000) {
    avg = Math.round(avg / 100) * 100;
  }
  return avg;
}

export function Mo3(results: AttemptResult[]): AttemptResult | null {
  results = results.filter((r) => r !== 0); // remove non-existing attempts

  if (results.some(isMultiResult)) return null; // cannot calculate average or mean for MBLD

  if (results.length !== 3) return null;

  if (results.filter((r) => r < 0).length > 0) {
    // we have at least 1 DNF or DNS, so mean is DNF by default
    return -1;
  }

  let avg = Math.round(
    (results.reduce(
      (a, b) => parseInt(`${a}`, 10) + parseInt(`${b}`, 10),
      0
    ) as number) / 3
  );
  if (avg > 60000) {
    avg = Math.round(avg / 100) * 100;
  }
  return avg;
}
