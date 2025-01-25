import { Course } from './course.types';
import { Score } from './scorecard.types';

export type Round = {
    _id: string; // ObjectId as a string
    course: Course;
    golfers: string[]; // Only stores golfers with linked accounts
    groupSize: number;
    scorecard: (Score | null)[]; // Array of scores per hole, can include null values
    front?: number; // Optional, total score for the front 9
    back?: number; // Optional, total score for the back 9
    total?: number; // Optional, total score for the round
    currentHole?: number;
    matchType: 'Match Play' | 'Stroke Play' | 'Scramble' | 'Best Ball'; // Enum for match type
    date: string;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
  };