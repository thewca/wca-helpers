import { RoundFormat } from './roundFormat';
import { TimeLimit } from './timeLimit';
import { Cutoff } from './cutoff';
import { AdvancementCondition } from './advancementCondition';
import { Result } from './result';
import { ScrambleSet } from './scrambleSet';
import { Extension } from './extension';
import { ActivityCode } from './activity';

export interface Round {
  id: ActivityCode;
  format: RoundFormat;
  timeLimit: TimeLimit | null;
  cutoff: Cutoff | null;
  advancementCondition: AdvancementCondition | null;
  results: Result[];
  scrambleSetCount?: number;
  scrambleSets?: ScrambleSet[];
  extensions: Extension[];
}
