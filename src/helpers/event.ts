import { EventId } from "../models";

export function getEventName(eventId: EventId): string {
  switch (eventId) {
    case '222': return '2x2x2 Cube';
    case '333': return '3x3x3 Cube';
    case '444': return '4x4x4 Cube';
    case '555': return '5x5x5 Cube';
    case '666': return '6x6x6 Cube';
    case '777': return '7x7x7 Cube';

    case '333bf': return '3x3x3 Blindfolded';
    case '333fm': return '3x3x3 Fewest Moves';
    case '333oh': return '3x3x3 One-Handed';
    case '333ft': return '3x3x3 With Feet';

    case 'clock': return 'Clock';
    case 'minx': return 'Megaminx';
    case 'pyram': return 'Pyraminx';
    case 'skewb': return 'Skewb';
    case 'sq1': return 'Square-1';

    case '444bf': return '4x4x4 Blindfolded';
    case '555bf': return '5x5x5 Blindfolded';
    case '333mbf': return '3x3x3 Multi-Blind';

    case 'magic': return 'Magic';
    case 'mmagic': return 'Master Magic';
    case '333mbo': return '3x3x3 Multi-Blind Old Style';
  }
}

export function getEventResultType(eventId: EventId): 'time' | 'number' | 'multi' {
  switch (eventId) {
    case '222':
    case '333':
    case '444':
    case '555':
    case '666':
    case '777':
    case '333bf':
    case '333oh':
    case '333ft':
    case 'clock':
    case 'minx':
    case 'pyram':
    case 'skewb':
    case 'sq1':
    case '444bf':
    case '555bf':
    case 'magic':
    case 'mmagic':
      return 'time';

    case '333fm':
      return 'number';

    
    case '333mbf':
    case '333mbo':
      return 'multi';
  }
}