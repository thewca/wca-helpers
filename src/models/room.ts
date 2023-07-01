import { Activity } from './activity';
import { Extension } from './extension';

export interface Room {
  id: number;
  name: string;
  color: string;
  activities: Activity[];
  extensions: Extension[];
}
