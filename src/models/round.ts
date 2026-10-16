import { RoundFormat } from './roundFormat';
import { TimeLimit } from './timeLimit';
import { Cutoff } from './cutoff';
import { ParticipationRuleset } from './participationRuleset';
import { Result } from './result';
import { ScrambleSet } from './scrambleSet';
import { Extension } from './extension';
import { ActivityCode } from './activity';

export interface Round {
  id: ActivityCode;
  linkedRounds: string[] | null;
  format: RoundFormat;
  timeLimit: TimeLimit | null;
  cutoff: Cutoff | null;
  participationRuleset: ParticipationRuleset | null;
  results: Result[];
  scrambleSetCount?: number;
  scrambleSets?: ScrambleSet[];
  extensions: Extension[];
}
