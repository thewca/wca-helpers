import { Avatar } from "./avatar";
import { Registration } from "./registration";
import { Assignment } from "./assignment";
import { PersonalBest } from "./personalBest";

export interface Person {
  registrantId: number;
  name: string;
  wcaUserId: number;
  wcaId?: string | null;
  countryIso2: string;
  gender?: 'm' | 'f' | 'o';
  birthdate?: string;
  email?: string;
  avatar?: Avatar | null;
  roles?: ('delegate' | 'organiser')[] | null;
  registration?: Registration | null;
  assignments?: Assignment[] | null;
  personalBests?: PersonalBest[] | null;
}