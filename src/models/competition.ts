import { Person } from './person';
import { Event } from './event';
import { Schedule } from './schedule';
import { Extension } from './extension';

export interface Competition {
  formatVersion: string;
  id: string;
  name: string;
  shortName: string;
  persons: Person[];
  events: Event[];
  schedule: Schedule;
  competitorLimit: number | null;
  extensions: Extension[];
}
