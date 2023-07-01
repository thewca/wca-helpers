import { EventId } from './eventId';
import { Round } from './round';
import { Qualification } from './qualification';
import { Extension } from './extension';

export interface Event {
  id: EventId;
  rounds: Round[];
  competitorLimit?: number | null;
  qualification?: Qualification | null;
  extensions: Extension[];
}
