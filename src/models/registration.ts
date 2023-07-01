import { EventId } from './eventId';

export interface Registration {
  wcaRegistrationId: number;
  eventIds: EventId[];
  status: 'accepted' | 'pending' | 'deleted';
  guests?: number;
  comments?: string;
  administrativeNotes?: string;
  isCompeting: boolean;
}
