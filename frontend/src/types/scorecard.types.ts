import { User } from "./user.types";

export type Score = {
    golfer: User;
    score: (number | null)[];
  };