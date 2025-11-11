export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Topic {
  id: string;
  title: string;
  description: string;
  icon: string;
  subtopics: string[];
}

export interface Challenge {
  id: string;
  topic: string;
  difficulty: Difficulty;
  instruction: string;
  starterCode: string;
  hints: string[];
}

export interface Evaluation {
  isCorrect: boolean;
  feedback: string;
  suggestions: string[];
  nextStep: string;
}

export interface Session {
  topic: Topic;
  difficulty: Difficulty;
  challengeHistory: Challenge[];
  currentChallenge: Challenge | null;
  score: number;
}
