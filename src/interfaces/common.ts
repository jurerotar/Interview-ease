export type Question = {
  question: string | null;
  expectedAnswer: string | null;
  additional: string | null;
};

export type GroupingStructure = {
  grouping: string | null;
  group: string | null;
  name: string;
}

export type Topic = {
  id: string;
  name: string;
  path?: string;
  groupingStructure?: GroupingStructure;
  questions?: Question[];
}

export type ParsedQuestion = {
  question: string;
  rating?: number;
  notes?: string;
};

export type ParsedTopic = {
  title: string;
  questions: ParsedQuestion[];
};
