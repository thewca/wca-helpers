import { Extension } from './extension';
import { Room } from './room';

export interface Venue {
  id: number;
  name: string;
  latitudeMicrodegrees: number;
  longitudeMicrodegrees: number;
  countryIso2: string;
  timezone: string;
  rooms: Room[];
  extensions: Extension[];
}
