import { EventId } from '../models';

interface EventData {
  name: string;
  resultType: 'time' | 'number' | 'multi';
}

const eventDataById: { [key: string]: EventData } = {
  '333': { resultType: 'time', name: '3x3x3 Cube' },
  '222': { resultType: 'time', name: '2x2x2 Cube' },
  '444': { resultType: 'time', name: '4x4x4 Cube' },
  '555': { resultType: 'time', name: '5x5x5 Cube' },
  '666': { resultType: 'time', name: '6x6x6 Cube' },
  '777': { resultType: 'time', name: '7x7x7 Cube' },
  '333bf': { resultType: 'time', name: '3x3x3 Blindfolded' },
  '333fm': { resultType: 'number', name: '3x3x3 Fewest Moves' },
  '333oh': { resultType: 'time', name: '3x3x3 One-Handed' },
  '333ft': { resultType: 'time', name: '3x3x3 With Feet' },
  minx: { resultType: 'time', name: 'Megaminx' },
  pyram: { resultType: 'time', name: 'Pyraminx' },
  clock: { resultType: 'time', name: 'Clock' },
  skewb: { resultType: 'time', name: 'Skewb' },
  sq1: { resultType: 'time', name: 'Square-1' },
  '444bf': { resultType: 'time', name: '4x4x4 Blindfolded' },
  '555bf': { resultType: 'time', name: '5x5x5 Blindfolded' },
  '333mbf': { resultType: 'multi', name: '3x3x3 Multi-Blind' },
  magic: { resultType: 'time', name: 'Magic' },
  mmagic: { resultType: 'time', name: 'Master Magic' },
  '333mbo': { resultType: 'multi', name: '3x3x3 Multi-Blind Old Style' },
};

export function getEventName(eventId: EventId): string {
  return eventDataById[eventId].name;
}

export function getEventResultType(
  eventId: EventId,
): 'time' | 'number' | 'multi' {
  return eventDataById[eventId].resultType;
}
