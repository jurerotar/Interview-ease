export type Question = {
  question: string | null;
  expectedAnswer: string | null;
  additional: string | null;
};

export type Structure = {
  name: string;
  id: string;
  path: string;
  children: Structure[];
  questions: Question[];
};

export type ParsedQuestion = {
  question: string;
  rating?: number;
  notes?: string;
};

export type ParsedTopic = {
  title: string;
  questions: ParsedQuestion[];
};
