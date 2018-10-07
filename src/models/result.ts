import { Attempt } from "./attempt";

export interface Result {
  personId: number;
  ranking: number;
  attempts: Attempt[];
}