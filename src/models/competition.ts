import { Person } from './person';
import { Event } from './event';
import { Schedule } from './schedule';
import { Extension } from './extension';
import { Series } from './series';
import { RegistrationInfo } from './registrationInfo';

export interface Competition {
  formatVersion: string;
  id: string;
  name: string;
  shortName: string;
  persons: Person[];
  events: Event[];
  schedule: Schedule;
  series: Series[];
  competitorLimit: number | null;
  extensions: Extension[];
  registrationInfo: RegistrationInfo;
}
