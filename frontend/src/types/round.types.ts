import { Course } from './course.types';

export type Round = {
    _id: string; // ObjectId as a string
    course: Course;
    golfers: string[]; // Array of ObjectIds as strings
    score: (number | null)[]; // Array of scores per hole, can include null values
    front?: number; // Optional, total score for the front 9
    back?: number; // Optional, total score for the back 9
    total?: number; // Optional, total score for the round
    matchType: 'Match Play' | 'Stroke Play' | 'Scramble' | 'Best Ball'; // Enum for match type
    date: string;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
  };