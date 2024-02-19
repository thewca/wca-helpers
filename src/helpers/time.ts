/**
 * Formats Centiseconds to a string like 3:30 or 0:43
 * @param centiTime
 */
export function formatCentiseconds(centiTime: number): string {
  if (centiTime === -1) {
    return 'DNF';
  }
  if (centiTime === -2) {
    return 'DNS';
  }
  let cs = centiTime % 100;
  let s = Math.floor(centiTime / 100) % 60;
  let m = Math.floor(centiTime / 6000);
  if (m > 0) {
    return `${m}:${prefix(s)}.${prefix(cs)}`;
  }
  return `${s}.${prefix(cs)}`;
}

/**
 * Pads out a number with a 0 if it's under 10
 * @param n
 */
function prefix(n: number): string {
  if (n < 10) {
    return `0${n}`;
  }
  return `${n}`;
}

export const SECOND_IN_CS = 100;
export const MINUTE_IN_CS = 60 * SECOND_IN_CS;
export const HOUR_IN_CS = 60 * MINUTE_IN_CS;

interface PluralizeParams {
  count: number;
  word: string;
  options?: {
    fixed?: number;
    abbreviate?: boolean;
  };
}

/**
 * Adds an s to a word if count is over 1.
 * Takes options to pad the count and abbreviate the word with its
 * first letter
 * @param count
 * @param word
 * @param options
 */
function pluralize({ count, word, options = {} }: PluralizeParams) {
  const countStr =
    options.fixed && count % 1 > 0 ? count.toFixed(options.fixed) : count;
  const countDesc = options.abbreviate
    ? word[0]
    : ` ${count === 1 ? word : `${word}s`}`;
  return countStr + countDesc;
}

interface CentiSecondsToHumanReadableParams {
  c: number;
  options?: {
    short?: boolean;
  };
}

/**
 * Converts Centiseconds to a human-readable string like "5:30 minutes"
 * @param c
 * @param options
 */
export function centiSecondsToHumanReadable({
  c,
  options = {},
}: CentiSecondsToHumanReadableParams) {
  let centiseconds = c;
  let str = '';

  const hours = centiseconds / HOUR_IN_CS;
  centiseconds %= HOUR_IN_CS;
  if (hours >= 1) {
    str += `${pluralize({
      count: Math.floor(hours),
      word: 'hour',
      options: { abbreviate: options.short },
    })} `;
  }

  const minutes = centiseconds / MINUTE_IN_CS;
  centiseconds %= MINUTE_IN_CS;
  if (minutes >= 1) {
    str += `${pluralize({
      count: Math.floor(minutes),
      word: 'minute',
      options: { abbreviate: options.short },
    })} `;
  }

  const seconds = centiseconds / SECOND_IN_CS;
  if (seconds > 0 || str.length === 0) {
    str += `${pluralize({
      count: seconds,
      word: 'second',
      options: { fixed: 2, abbreviate: options.short },
    })} `;
  }

  return str.trim();
}
