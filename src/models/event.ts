import { EventId } from "./eventId";
import { Round } from "./round";
import { Qualification } from "./qualification";

export interface Event {
  id: EventId;
  rounds: Round[] | null;
  competitorLimit?: number | null;
  qualification?: Qualification | null;
}