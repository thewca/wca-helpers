import { Result } from '../models/result';
import { RankingType } from '../models/rankingType';
import { Ao5, Mo3 } from './average';
import { AttemptResult } from '../models/attemptResult';

export function rank(results: Result[], rankingOrder: RankingType[]): Result[] {
  let averageCache: { [personId: number]: AttemptResult | null } = {};
  let bestCache: { [personId: number]: number } = {};

  // first calc bests and averages where applicable
  results.forEach((r) => {
    let plain = r.attempts.map((a) => a.result);
    if (rankingOrder.indexOf('average') > -1) {
      let average = r.attempts.length === 5 ? Ao5(plain) : Mo3(plain);
      if ((average as number) < 0) {
        average = Number.MAX_VALUE; // average can only be DNF, so no need to distinguish between DNF and DNS
      }
      averageCache[r.personId] = average;
    }
    let valid = plain.map((x) => parseInt(`${x}`, 10)).filter((x) => x > 0);
    if (valid.length > 0) {
      bestCache[r.personId] = Math.min(...valid);
    }
  });

  // then order the results
  results.sort((a, b) => {
    for (var i = 0; i < rankingOrder.length; i++) {
      switch (rankingOrder[i]) {
        case 'average':
          if (averageCache[a.personId] && averageCache[b.personId]) {
            if (averageCache[a.personId]! < averageCache[b.personId]!)
              return -1;
            if (averageCache[a.personId]! > averageCache[b.personId]!) return 1;
          }
          if (averageCache[a.personId] && !averageCache[b.personId]) return -1;
          if (!averageCache[a.personId] && averageCache[b.personId]) return 1;
          break;
        case 'single':
          if (bestCache[a.personId] && bestCache[b.personId]) {
            if (bestCache[a.personId] < bestCache[b.personId]) return -1;
            if (bestCache[a.personId] > bestCache[b.personId]) return 1;
          }
          if (bestCache[a.personId] && !bestCache[b.personId]) return -1;
          if (!bestCache[a.personId] && bestCache[b.personId]) return 1;
      }
    }

    // neither has a better average or single, so normally we'd sort by name here
    // as name is unavailable here however, we'll sort by personId, as that's all we have...
    if (a.personId < b.personId) return -1;
    if (a.personId > b.personId) return 1;
    return 0;
  });

  // then calculate and set rankings
  let currentRanking = 1;
  let numWithCurrentRanking = 0;
  results.forEach((result, ix) => {
    if (ix > 0) {
      // compare with previous to see if we start a new ranking, or if this is the same ranking
      let sameRanking = true;
      let cpid = result.personId;
      let ppid = results[ix - 1].personId;
      rankingOrder.forEach((ro) => {
        switch (ro) {
          case 'average':
            if (averageCache[cpid] !== averageCache[ppid]) sameRanking = false;
            break;
          case 'single':
            if (bestCache[cpid] !== bestCache[ppid]) sameRanking = false;
            break;
        }
      });
      if (!sameRanking) {
        currentRanking += numWithCurrentRanking;
        numWithCurrentRanking = 0;
      }
    }
    result.ranking = currentRanking;
    numWithCurrentRanking++;
  });

  // now return the results ordered and with ranking applied
  return results;
}
