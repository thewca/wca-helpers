import { WcaId } from '../models';

export function isWcaId(wcaId: string): wcaId is WcaId {
  return /^\d{4}[A-Z]{4}\d{2}$/.test(wcaId.toUpperCase());
}
