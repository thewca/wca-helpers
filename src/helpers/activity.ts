import { EventId } from '../models';
import { getEventName } from './event';

export interface ParsedActivityCode {
  eventId: EventId;
  roundNumber: number | null;
  groupNumber: number | null;
  attemptNumber: number | null;
}

export function parseActivityCode(activityCode: string): ParsedActivityCode {
  const [, e, r, g, a] = activityCode.match(
    /^(\w+)(?:-r(\d+))?(?:-g(\d+))?(?:-a(\d+))?$/
  ) as any[];
  return {
    eventId: e,
    roundNumber: r ? parseInt(r, 10) : null,
    groupNumber: g ? parseInt(g, 10) : null,
    attemptNumber: a ? parseInt(a, 10) : null,
  };
}

export function activityCodeToName(activityCode: string): string {
  const { eventId, roundNumber, groupNumber, attemptNumber } =
    parseActivityCode(activityCode);
  return [
    eventId && getEventName(eventId),
    roundNumber && `Round ${roundNumber}`,
    groupNumber && `Group ${groupNumber}`,
    attemptNumber && `Attempt ${attemptNumber}`,
  ]
    .filter((x) => x)
    .join(', ');
}
