import { Venue } from './venue';

export interface Schedule {
  startDate: string;
  numberOfDays: number;
  venues: Venue[];
}
