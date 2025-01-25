import { User } from "./user.types";

export type Score = {
    golfer: User;
    displayName: string;
    score: (number | null)[];
  };