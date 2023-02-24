import { RoundFormat, RankingType } from '../models';

export function getFormatName(format: RoundFormat): string {
  switch (format) {
    case '1':
      return 'Best of 1';
    case '2':
      return 'Best of 2';
    case '3':
      return 'Best of 3';
    case 'a':
      return 'Average of 5';
    case 'm':
      return 'Mean of 3';
  }
}

export function getFormatRanking(format: RoundFormat): RankingType[] {
  switch (format) {
    case '1':
    case '2':
    case '3':
      return ['single'];
    case 'a':
    case 'm':
      return ['average', 'single'];
  }
}

export function getFormatExpectedSolves(format: RoundFormat): number {
  switch (format) {
    case '1':
      return 1;
    case '2':
      return 2;
    case '3':
      return 3;
    case 'a':
      return 5;
    case 'm':
      return 3;
  }
}

export function getFormatTrimBest(format: RoundFormat): number {
  switch (format) {
    case '1':
    case '2':
    case '3':
    case 'm':
      return 0;
    case 'a':
      return 1;
  }
}

export function getFormatTrimWorst(format: RoundFormat): number {
  switch (format) {
    case '1':
    case '2':
    case '3':
    case 'm':
      return 0;
    case 'a':
      return 1;
  }
}
