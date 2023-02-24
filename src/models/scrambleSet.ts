import { Scramble } from './scramble';

export interface ScrambleSet {
  id: number;
  scrambles: Scramble[];
  extraScrambles: Scramble[];
}
