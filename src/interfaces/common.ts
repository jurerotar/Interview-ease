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
