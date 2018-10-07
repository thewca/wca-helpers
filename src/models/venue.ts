import { Room } from "./room";

export interface Venue {
  id: number;
  name: number;
  latitudeMicrodegrees: number;
  longitudeMicrodegrees: number;
  timezone: string;
  rooms: Room[];
}