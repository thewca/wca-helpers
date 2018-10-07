import { RoundFormat } from "./roundFormat";
import { TimeLimit } from "./timelimit";
import { Cutoff } from "./cutoff";
import { AdvancementCondition } from "./advancementCondition";
import { Result } from "./result";
import { ScrambleSet } from "./scrambleSet";

export interface Round {
  id: string;
  format: RoundFormat;
  timeLimit?: TimeLimit | null;
  cutoff?: Cutoff | null;
  advancementCondition?: AdvancementCondition | null;
  results?: Result[];
  scrambleSetCount?: number;
  scrambleSets?: ScrambleSet[];
}